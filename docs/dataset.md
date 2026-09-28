# VajraNet AI — Synthetic Dataset & ML Feature Engineering

> **Privacy & Sovereignty Notice:**  
> All records in `backend/data/synthetic_ipsec_flow_dataset.csv` are synthetically generated or sanitized testbed telemetry. No user payload or inner encrypted bytes are inspected or included.

---

## 1. Feature Taxonomy

The classifier operates entirely on non-payload statistical flow metrics extracted from outer IPsec ESP headers and packet interarrival times:

| Feature Name | Type | Unit | Description |
|:---|:---:|:---:|:---|
| `mean_packet_length` | Float | Bytes | Average size of outer ESP frames |
| `packet_length_std` | Float | Bytes | Standard deviation of packet sizes (indicates variable vs fixed padding) |
| `packets_per_second` | Float | pps | Packet throughput cadence |
| `bytes_per_second` | Float | Bps | Aggregate bandwidth utilization |
| `mean_interarrival_ms` | Float | Milliseconds | Average delay between successive packets |
| `interarrival_std_ms` | Float | Milliseconds | Jitter in packet arrival timing |
| `upload_download_ratio` | Float | Ratio | Asymmetry between outbound and inbound traffic flows |
| `flow_duration_seconds` | Float | Seconds | Total active window length |
| `burst_count` | Integer | Count | Number of rapid packet cluster events |
| `rekey_detected` | Binary | 0 or 1 | Whether SPI changeover occurred during sample window |
| `nat_t_detected` | Binary | 0 or 1 | Whether UDP 4500 encapsulation was active |

---

## 2. Target Classes

1. `Encrypted_VoIP` (Strict 20ms cadence, ~200B frames)
2. `Interactive_SSH` (Variable typing latency, small bursts)
3. `Database_Replication` (High rate, large bulk payloads, cyclical bursts)
4. `Medical_Imaging_DICOM` (MTU-maxed frames, high burst intensity)
5. `Telemetry_Heartbeat` (Periodic 1-second pulse, small fixed size)
6. `Bulk_Data_Transfer` (Sustained maximum throughput)

---

## 3. Training & Validation Performance

- **Algorithm**: Random Forest Classifier (`n_estimators=100`, `max_depth=12`, `random_state=42`)
- **Dataset Size**: 2,500 samples
- **Split**: 80% Train, 20% Test (stratified)
- **Macro F1-Score**: 0.94+
- **Inference Latency**: < 2.5 milliseconds per flow on standard CPU.
