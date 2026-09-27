#!/usr/bin/env python3

import os
import re
import sys
from pathlib import Path


# ============================================================
# CONFIGURATION
# ============================================================

SHARE_DIR = Path("share")

# ------------------------------------------------------------
# Team ID
#
# Expected:
# SIH-A0H-T001
# SIH-A0H-T002
# SIH-A0H-T999
#
# TXXX = T + exactly 3 digits
# ------------------------------------------------------------

TEAM_ID_REGEX = re.compile(
    r"^SIH-A0H-(T\d{3})$"
)

# ------------------------------------------------------------
# Presentation
#
# Expected:
# SIH-A0H-T001-SIH26001_Presentation.pdf
# SIH-A0H-T001-SIH26001_Presentation.pptx
#
# TXXX  = T + 3 digits
# YYY   = 3 digits
# ------------------------------------------------------------

PRESENTATION_REGEX = re.compile(
    r"^(SIH-A0H-(T\d{3})-SIH26\d{3})_Presentation\.(pdf|pptx)$",
    re.IGNORECASE
)

# ------------------------------------------------------------
# Student Declaration
#
# Expected:
# SIH-A0H-T001_Student_Declaration.pdf
# SIH-A0H-T001_Student_Declaration.docx
# ------------------------------------------------------------

STUDENT_DECLARATION_REGEX = re.compile(
    r"^SIH-A0H-(T\d{3})_Student_Declaration\.(pdf|docx)$",
    re.IGNORECASE
)

# ------------------------------------------------------------
# Team Declaration Internal
#
# Expected:
# SIH-A0H-T001_Team_Declaration_Internal.pdf
# ------------------------------------------------------------

TEAM_DECLARATION_REGEX = re.compile(
    r"^SIH-A0H-(T\d{3})_Team_Declaration_Internal\.pdf$",
    re.IGNORECASE
)


# ============================================================
# TEAM RECORD
# ============================================================

class TeamSubmission:

    def __init__(self, team_id):
        self.team_id = team_id

        self.presentation = False
        self.student_declaration = False
        self.team_declaration = False

        self.presentation_file = None
        self.student_declaration_file = None
        self.team_declaration_file = None

    def missing_files(self):

        missing = []

        if not self.presentation:
            missing.append("Presentation")

        if not self.student_declaration:
            missing.append("Student_Declaration")

        if not self.team_declaration:
            missing.append("Team_Declaration_Internal")

        return missing

    def is_complete(self):
        return len(self.missing_files()) == 0


# ============================================================
# DISCOVER TEAMS
# ============================================================

def discover_teams(files):

    teams = {}

    for filename in files:

        match = PRESENTATION_REGEX.match(filename)

        if match:
            team_id = match.group(2)

            if team_id not in teams:
                teams[team_id] = TeamSubmission(team_id)

            continue

        match = STUDENT_DECLARATION_REGEX.match(filename)

        if match:
            team_id = match.group(1)

            if team_id not in teams:
                teams[team_id] = TeamSubmission(team_id)

            continue

        match = TEAM_DECLARATION_REGEX.match(filename)

        if match:
            team_id = match.group(1)

            if team_id not in teams:
                teams[team_id] = TeamSubmission(team_id)

            continue

    return teams


# ============================================================
# CHECK FILES
# ============================================================

def check_files(teams, files):

    for filename in files:

        # ----------------------------------------------------
        # Presentation
        # ----------------------------------------------------

        match = PRESENTATION_REGEX.match(filename)

        if match:

            team_id = match.group(2)

            teams[team_id].presentation = True
            teams[team_id].presentation_file = filename

            continue

        # ----------------------------------------------------
        # Student Declaration
        # ----------------------------------------------------

        match = STUDENT_DECLARATION_REGEX.match(filename)

        if match:

            team_id = match.group(1)

            teams[team_id].student_declaration = True
            teams[team_id].student_declaration_file = filename

            continue

        # ----------------------------------------------------
        # Team Declaration
        # ----------------------------------------------------

        match = TEAM_DECLARATION_REGEX.match(filename)

        if match:

            team_id = match.group(1)

            teams[team_id].team_declaration = True
            teams[team_id].team_declaration_file = filename

            continue


# ============================================================
# GITHUB SUMMARY
# ============================================================

def write_github_summary(teams):

    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")

    if not summary_file:
        return

    with open(summary_file, "a", encoding="utf-8") as f:

        f.write("# SIH 2026 Mandatory Document Check\n\n")

        if not teams:
            f.write(
                "⚠️ **No valid team submission files were found in `share/`.**\n\n"
            )
            return

        f.write(
            "| Team | Presentation | Student Declaration | "
            "Team Declaration | Status |\n"
        )

        f.write(
            "|---|---|---|---|---|\n"
        )

        for team_id in sorted(teams):

            team = teams[team_id]

            presentation = "✅" if team.presentation else "❌"
            student = "✅" if team.student_declaration else "❌"
            team_decl = "✅" if team.team_declaration else "❌"

            if team.is_complete():
                status = "✅ PASS"
            else:
                status = "❌ FAIL"

            f.write(
                f"| `{team_id}` | "
                f"{presentation} | "
                f"{student} | "
                f"{team_decl} | "
                f"{status} |\n"
            )

        f.write("\n")

        f.write("## Detailed Results\n\n")

        for team_id in sorted(teams):

            team = teams[team_id]

            f.write(f"### {team_id}\n\n")

            if team.presentation:
                f.write(
                    f"- ✅ Presentation: `{team.presentation_file}`\n"
                )
            else:
                f.write(
                    "- ❌ Presentation missing "
                    "(PDF or PPTX required)\n"
                )

            if team.student_declaration:
                f.write(
                    f"- ✅ Student Declaration: "
                    f"`{team.student_declaration_file}`\n"
                )
            else:
                f.write(
                    "- ❌ Student Declaration missing "
                    "(PDF or DOCX required)\n"
                )

            if team.team_declaration:
                f.write(
                    f"- ✅ Team Declaration Internal: "
                    f"`{team.team_declaration_file}`\n"
                )
            else:
                f.write(
                    "- ❌ Team Declaration Internal missing "
                    "(PDF required)\n"
                )

            f.write("\n")


# ============================================================
# MAIN
# ============================================================

def main():

    print("=" * 70)
    print("SIH 2026 MANDATORY DOCUMENT CHECK")
    print("=" * 70)

    # --------------------------------------------------------
    # Check share directory
    # --------------------------------------------------------

    if not SHARE_DIR.exists():

        print()
        print("ERROR: share/ directory does not exist.")
        print()

        # Write GitHub summary
        summary_file = os.environ.get("GITHUB_STEP_SUMMARY")

        if summary_file:

            with open(summary_file, "a", encoding="utf-8") as f:

                f.write("# SIH 2026 Mandatory Document Check\n\n")
                f.write(
                    "❌ **FAIL** — `share/` directory does not exist.\n"
                )

        sys.exit(1)

    # --------------------------------------------------------
    # Get files directly inside share/
    # --------------------------------------------------------

    files = [
        item.name
        for item in SHARE_DIR.iterdir()
        if item.is_file()
    ]

    print()
    print(f"Files found in share/: {len(files)}")
    print()

    for filename in sorted(files):
        print(f"  - {filename}")

    # --------------------------------------------------------
    # Discover teams
    # --------------------------------------------------------

    teams = discover_teams(files)

    # --------------------------------------------------------
    # Check requirements
    # --------------------------------------------------------

    check_files(teams, files)

    # --------------------------------------------------------
    # Print results
    # --------------------------------------------------------

    print()
    print("=" * 70)
    print("RESULT")
    print("=" * 70)

    total_missing = 0
    total_teams = len(teams)

    for team_id in sorted(teams):

        team = teams[team_id]

        missing = team.missing_files()

        print()
        print(f"Team: {team_id}")

        print(
            f"  Presentation: "
            f"{'PASS' if team.presentation else 'MISSING'}"
        )

        print(
            f"  Student Declaration: "
            f"{'PASS' if team.student_declaration else 'MISSING'}"
        )

        print(
            f"  Team Declaration Internal: "
            f"{'PASS' if team.team_declaration else 'MISSING'}"
        )

        if missing:

            print()
            print(
                f"  STATUS: FAIL "
                f"({len(missing)} missing)"
            )

            print(
                f"  Missing: {', '.join(missing)}"
            )

            total_missing += len(missing)

        else:

            print()
            print("  STATUS: PASS")

    # --------------------------------------------------------
    # GitHub summary
    # --------------------------------------------------------

    write_github_summary(teams)

    # --------------------------------------------------------
    # Overall result
    # --------------------------------------------------------

    print()
    print("=" * 70)

    if not teams:

        print("OVERALL STATUS: FAIL")
        print("No valid team submissions found.")
        print("=" * 70)

        # Store result for apply_labels.py
        with open("mandatory_result.txt", "w", encoding="utf-8") as f:
            f.write("FAIL\n")
            f.write("0\n")
            f.write("NO_TEAMS\n")

        sys.exit(1)

    if total_missing == 0:

        print("OVERALL STATUS: PASS")
        print(f"Teams checked: {total_teams}")
        print("All mandatory documents are present.")

        with open("mandatory_result.txt", "w", encoding="utf-8") as f:
            f.write("PASS\n")
            f.write("0\n")
            f.write("")

        print("=" * 70)

        sys.exit(0)

    else:

        print("OVERALL STATUS: FAIL")
        print(f"Teams checked: {total_teams}")
        print(f"Total missing documents: {total_missing}")

        # ----------------------------------------------------
        # Store result for label script
        # ----------------------------------------------------

        with open("mandatory_result.txt", "w", encoding="utf-8") as f:

            f.write("FAIL\n")
            f.write(f"{total_missing}\n")

            for team_id in sorted(teams):

                missing = teams[team_id].missing_files()

                if missing:

                    f.write(
                        f"{team_id}|"
                        f"{','.join(missing)}\n"
                    )

        print("=" * 70)

        sys.exit(1)


if __name__ == "__main__":
    main()

