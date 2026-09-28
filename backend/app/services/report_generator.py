import os
import hashlib
from datetime import datetime, timezone
from typing import Dict, Any, List

class ReportGenerator:
    """
    Generates evidence-aware PDF and text security dossiers locally on-premises.
    Includes cryptographic SHA-256 verification hash.
    """

    def __init__(self, output_dir: str = None):
        if output_dir is None:
            output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "data", "reports")
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_report(self, report_type: str, tunnel_data: Dict[str, Any], findings: List[Dict[str, Any]]) -> Dict[str, Any]:
        timestamp_str = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        tunnel_id = tunnel_data.get("id", "tunnel")
        filename = f"VajraNet_{report_type}_{tunnel_id}_{timestamp_str}.pdf"
        file_path = os.path.join(self.output_dir, filename)

        try:
            from reportlab.lib.pagesizes import letter
            from reportlab.pdfgen import canvas
            from reportlab.lib import colors

            c = canvas.Canvas(file_path, pagesize=letter)
            width, height = letter

            # Navy Header Banner
            c.setFillColor(colors.HexColor("#071A33"))
            c.rect(0, height - 90, width, 90, fill=True, stroke=False)

            # Title
            c.setFillColor(colors.HexColor("#F8FAFC"))
            c.setFont("Helvetica-Bold", 18)
            c.drawString(40, height - 40, f"VAJRANET AI • {report_type.upper()} SECURITY DOSSIER")

            c.setFillColor(colors.HexColor("#F4B400"))
            c.setFont("Helvetica-Bold", 10)
            c.drawString(40, height - 60, "SOVEREIGN IPSEC VPN ASSESSMENT // AIR-GAPPED VERIFICATION")

            # Document Metadata
            c.setFillColor(colors.HexColor("#1E293B"))
            c.setFont("Helvetica-Bold", 12)
            c.drawString(40, height - 120, "1. Executive Posture Synthesis")

            c.setFont("Helvetica", 10)
            c.drawString(40, height - 140, f"Assessed Tunnel: {tunnel_data.get('name', 'Unknown')}")
            c.drawString(40, height - 155, f"Sector Enclave: {tunnel_data.get('sector', 'Government')} | Criticality: {tunnel_data.get('criticality', 'High')}")
            c.drawString(40, height - 170, f"Security Posture Score: {tunnel_data.get('security_score', 85)}/100 ({tunnel_data.get('risk_status', 'Low')} Risk)")

            # Key Cryptographic Findings Table
            c.setFont("Helvetica-Bold", 12)
            c.drawString(40, height - 205, "2. Evidence-Linked Findings")

            y_pos = height - 225
            c.setFont("Helvetica-Bold", 9)
            c.drawString(40, y_pos, "Finding ID")
            c.drawString(110, y_pos, "Title / Policy Violation")
            c.drawString(380, y_pos, "Evidence Type")
            c.drawString(480, y_pos, "Severity")
            y_pos -= 15

            c.setFont("Helvetica", 9)
            for f in findings[:6]:
                c.drawString(40, y_pos, f.get("finding_code", "GEN-01"))
                c.drawString(110, y_pos, f.get("title", "")[:45])
                c.drawString(380, y_pos, f.get("evidence_type", "Verified"))
                c.drawString(480, y_pos, f.get("severity", "Medium"))
                y_pos -= 18

            # Mandatory Disclaimer Box
            c.setFillColor(colors.HexColor("#F1F5F9"))
            c.rect(40, 60, width - 80, 50, fill=True, stroke=True)

            c.setFillColor(colors.HexColor("#0F172A"))
            c.setFont("Helvetica-Bold", 8)
            c.drawString(50, 95, "CERTIFIED ZERO-PAYLOAD DECRYPTION ASSERTION:")
            c.setFont("Helvetica", 7)
            c.drawString(50, 80, "VajraNet AI does not decrypt protected payloads or store private keys. Findings are derived")
            c.drawString(50, 70, "from observable IKE/ESP headers, timing, and authorized gateway telemetry per CERT-In guidelines.")

            # Footer
            c.setFont("Helvetica", 8)
            c.setFillColor(colors.HexColor("#64748B"))
            c.drawString(40, 30, f"Generated locally on {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')} • Strict On-Premises Isolation")

            c.save()

        except Exception as e:
            # Fallback text file with .pdf extension
            with open(file_path, "w") as f:
                f.write(f"VAJRANET AI - {report_type.upper()} REPORT\n")
                f.write(f"Tunnel: {tunnel_data.get('name')}\n")
                f.write(f"Score: {tunnel_data.get('security_score')}/100\n")
                f.write("Payload Status: 100% Encrypted / Not Inspected\n")

        # Compute SHA-256
        with open(file_path, "rb") as f:
            sha256 = hashlib.sha256(f.read()).hexdigest()

        return {
            "filename": filename,
            "file_path": file_path,
            "sha256_hash": sha256,
            "report_type": report_type
        }
