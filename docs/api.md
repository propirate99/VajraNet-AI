# VajraNet AI — REST API Documentation

Base URL: `http://localhost:8000/api`  
Interactive Swagger Docs: `http://localhost:8000/docs`  
Interactive ReDoc: `http://localhost:8000/redoc`

---

## 1. Authentication (`/api/auth`)

### `POST /api/auth/login`
Authenticates a sovereign operator and issues a standard JWT Bearer token.

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "analyst@vajranet.local", "password": "password123"}'
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": 2,
    "email": "analyst@vajranet.local",
    "full_name": "Sovereign Analyst",
    "role": "Security Analyst",
    "organization": "CERT-In Assessment Cell",
    "is_active": true
  }
}
```

---

## 2. Dashboard (`/api/dashboard`)

### `GET /api/dashboard/summary`
Returns aggregate system posture, overall score (78/100), active tunnel counts, and sector breakdowns.

```bash
curl -s http://localhost:8000/api/dashboard/summary
```

---

## 3. Tunnels (`/api/tunnels`)

### `GET /api/tunnels`
Returns list of all 12 monitored tunnels with cryptographic suites and risk scores.

### `GET /api/tunnels/{tunnel_id}`
Returns granular telemetry for a specific tunnel.

### `POST /api/tunnels/{tunnel_id}/remediate`
Applies sovereign configuration remediation delta to resolve PFS and SA lifetime drift.

```bash
curl -X POST http://localhost:8000/api/tunnels/tun-02/remediate \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 4. Assessments (`/api/assessments`)

### `POST /api/assessments`
Ingests authorized PCAP metadata summary, gateway telemetry dump, and policy YAML to produce an end-to-end security assessment.

```bash
curl -X POST http://localhost:8000/api/assessments \
  -F "tunnel_id=tun-02" \
  -F "assessment_name=District Office Audit" \
  -F "is_authorized=true" \
  -F "pcap_file=@backend/data/demo_pcaps/risky_government_metadata.json" \
  -F "telemetry_file=@backend/data/demo_telemetry/risky_government_swanctl.txt" \
  -F "policy_file=@backend/data/demo_policies/government_secure_vpn_baseline.yaml"
```

---

## 5. Reports (`/api/reports`)

### `POST /api/reports/generate`
Generates a cryptographic PDF report signed with an on-premises SHA-256 digest.

```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{"assessment_id": "asm-01", "report_type": "Executive"}'
```

### `GET /api/reports/{report_id}/download`
Streams the generated PDF binary directly to the client.
