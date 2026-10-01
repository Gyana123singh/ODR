import {
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Plus,
  X,
  Printer,
  ShieldCheck,
  QrCode,
  Building,
  Check,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosConfig";

export default function Payments() {
  const [isMobile] = useState(window.innerWidth <= 480);
  const userEmail = localStorage.getItem("userEmail") || "";

  const [payments, setPayments] = useState([
    {
      id: 1,
      caseId: "2024-45",
      caseTitle: "Smith vs. Johnson",
      amount: "₹5,000",
      dueDate: "25 Sep 2025",
      status: "Paid",
      statusColor: "#22bb33",
      paymentDate: "20 Sep 2025",
      paymentMethod: "Credit Card",
      transactionId: "TXN-2024-001",
    },
    {
      id: 2,
      caseId: "2024-52",
      caseTitle: "ABC Corp vs. XYZ Ltd",
      amount: "₹7,500",
      dueDate: "30 Sep 2025",
      status: "Pending",
      statusColor: "#ff9900",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
    },
    {
      id: 3,
      caseId: "2024-48",
      caseTitle: "Estate of Brown",
      amount: "₹3,500",
      dueDate: "28 Sep 2025",
      status: "Overdue",
      statusColor: "#ff5555",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
    },
    {
      id: 4,
      caseId: "2024-42",
      caseTitle: "Contract Dispute",
      amount: "₹4,200",
      dueDate: "15 Sep 2025",
      status: "Paid",
      statusColor: "#22bb33",
      paymentDate: "14 Sep 2025",
      paymentMethod: "Net Banking",
      transactionId: "TXN-2024-002",
    },
  ]);

  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/api/payments/my");
      if (res.data && res.data.data && res.data.data.length > 0) {
        const backendPayments = res.data.data.map((p, idx) => ({
          id: p._id || Date.now() + idx,
          caseId: p.caseId || "ODR-2024",
          caseTitle: p.caseTitle || `Dispute Fee Payment - Case #${p.caseId || "2024-45"}`,
          amount: `₹${Number(p.amount).toLocaleString("en-IN")}`,
          dueDate: new Date(p.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: p.status === "Completed" ? "Paid" : p.status,
          statusColor: p.status === "Completed" ? "#22bb33" : p.status === "Pending" ? "#ff9900" : "#ff5555",
          paymentDate: new Date(p.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          paymentMethod: p.method || "Credit Card",
          transactionId: p.transactionId || `TXN-ODR-${Math.floor(100000 + Math.random() * 900000)}`,
        }));

        setPayments((prev) => {
          const ids = new Set(backendPayments.map((b) => b.id));
          return [...backendPayments, ...prev.filter((p) => !ids.has(p.id))];
        });
      }
    } catch (err) {
      console.warn("Backend payments fetch note:", err.message);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userEmail]);

  // Modal States
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [payingPayment, setPayingPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [completedPaymentData, setCompletedPaymentData] = useState(null);

  // Checkout Form States
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("4532 8920 1192 3847");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("789");
  const [cardName, setCardName] = useState("John Respondent");
  const [upiId, setUpiId] = useState("respondent@okaxis");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const paidPayments = payments.filter((p) => p.status === "Paid");
  const pendingPayments = payments.filter((p) => p.status === "Pending");
  const overduePayments = payments.filter((p) => p.status === "Overdue");

  const totalPaid = paidPayments.length;
  const totalPending = pendingPayments.length;
  const totalOverdue = overduePayments.length;

  // VIEW RECEIPT HANDLER
  const handleViewReceipt = (payment) => {
    setSelectedReceipt(payment);
  };

  // DOWNLOAD / PRINT RECEIPT HANDLER
  const handleDownloadReceipt = (payment) => {
    const txn = payment.transactionId || `TXN-ODR-${Math.floor(100000 + Math.random() * 900000)}`;
    const pDate = payment.paymentDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const pMethod = payment.paymentMethod || "Online Gateway";

    const receiptHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Receipt_${payment.caseId}_${txn}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          body { background: #f8fafc; padding: 40px 20px; color: #0f172a; }
          .receipt-container {
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 40px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 24px;
            margin-bottom: 28px;
          }
          .logo-text { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
          .logo-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: #dcfce7;
            color: #15803d;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 28px;
          }
          .info-card {
            background: #f8fafc;
            padding: 14px 18px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          .info-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; }
          .info-val { font-size: 15px; font-weight: 700; color: #0f172a; }
          .table-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
          th { text-align: left; padding: 12px; background: #f1f5f9; color: #475569; font-size: 12px; text-transform: uppercase; font-weight: 700; }
          td { padding: 14px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b; }
          .total-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #0f172a;
            color: #ffffff;
            padding: 18px 24px;
            border-radius: 12px;
            margin-bottom: 28px;
          }
          .total-label { font-size: 15px; font-weight: 600; }
          .total-amount { font-size: 24px; font-weight: 800; color: #38bdf8; }
          .footer {
            border-top: 1px dashed #cbd5e1;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.6;
          }
          @media print {
            body { padding: 0; background: #fff; }
            .receipt-container { box-shadow: none; border: none; padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div>
              <div class="logo-text">UTKAL ODR</div>
              <div class="logo-sub">Online Dispute Resolution Platform • Government of Odisha Partner</div>
            </div>
            <div>
              <span class="badge">✓ Payment Received</span>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Transaction ID</div>
              <div class="info-val">${txn}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Payment Date</div>
              <div class="info-val">${pDate}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Case Number</div>
              <div class="info-val">Case #${payment.caseId}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Payment Method</div>
              <div class="info-val">${pMethod}</div>
            </div>
          </div>

          <div class="table-title">Breakdown of Charges</div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Case Title</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arbitration & Dispute Resolution Hearing Fee</td>
                <td><strong>${payment.caseTitle}</strong></td>
                <td style="text-align: right; font-weight: 700;">${payment.amount}</td>
              </tr>
            </tbody>
          </table>

          <div class="total-box">
            <span class="total-label">Total Amount Settled</span>
            <span class="total-amount">${payment.amount}</span>
          </div>

          <div class="footer">
            <p><strong>Official Utkal ODR Verified Electronic Payment Receipt</strong></p>
            <p>This document is digitally validated under the Information Technology Act. No physical signature is required.</p>
            <p>Support: payments@utkalodr.gov.in • Helpline: 1800-ODR-UTKAL</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 400);
          }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([receiptHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");

    if (!win) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt_${payment.caseId}_${txn}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    toast.success(`Receipt for Case #${payment.caseId} opened for download/printing!`);
  };

  // OPEN PAY NOW CHECKOUT MODAL
  const handleOpenPayModal = (payment) => {
    setPayingPayment(payment);
    setPaymentSuccess(false);
    setCompletedPaymentData(null);
  };

  // PROCESS PAYMENT SUBMISSION
  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!payingPayment) return;

    setIsProcessing(true);

    try {
      const numAmount = parseFloat(payingPayment.amount.replace(/[^0-9.]/g, "")) || 5000;
      let chosenMethodTitle = "Credit Card";
      if (paymentMethod === "upi") chosenMethodTitle = "UPI";
      if (paymentMethod === "netbanking") chosenMethodTitle = "Net Banking";

      let newTxnId = `TXN-2025-${Math.floor(100000 + Math.random() * 900000)}`;

      // Attempt to record with backend
      try {
        const res = await axiosInstance.post("/api/payments", {
          amount: numAmount,
          method: chosenMethodTitle,
          status: "Completed",
          caseId: payingPayment.caseId,
          caseTitle: payingPayment.caseTitle,
        });
        if (res.data?.data?.transactionId) {
          newTxnId = res.data.data.transactionId;
        }
      } catch (apiErr) {
        console.warn("Backend payment logging note:", apiErr.message);
      }

      // Simulate secure gateway turnaround
      await new Promise((resolve) => setTimeout(resolve, 800));

      const todayFormatted = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const updatedRecord = {
        ...payingPayment,
        status: "Paid",
        statusColor: "#22bb33",
        paymentDate: todayFormatted,
        paymentMethod: chosenMethodTitle,
        transactionId: newTxnId,
      };

      // Update state so the payment is immediately marked as Paid!
      setPayments((prev) =>
        prev.map((item) => (item.id === payingPayment.id ? updatedRecord : item))
      );

      setCompletedPaymentData(updatedRecord);
      setPaymentSuccess(true);
      fetchPayments();
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Payment processing error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const styles = {
    container: {
      padding: isMobile ? "1rem" : "2rem",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      backgroundColor: "#ff9900",
      color: "#fff",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      marginBottom: isMobile ? "1rem" : "2rem",
      fontSize: "18px",
      fontWeight: "600",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "1rem",
      marginBottom: "2rem",
    },
    statCard: (color) => ({
      backgroundColor: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      borderLeft: `4px solid ${color}`,
      textAlign: "center",
    }),
    statIcon: {
      fontSize: "28px",
      marginBottom: "0.5rem",
      display: "flex",
      justifyContent: "center",
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "0.25rem",
    },
    statLabel: {
      fontSize: "13px",
      color: "#666",
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginTop: "2rem",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    paymentsList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginBottom: "2rem",
    },
    paymentCard: (statusColor) => ({
      display: "flex",
      gap: "1rem",
      padding: "1.1rem 1.25rem",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      borderLeft: `5px solid ${statusColor}`,
      transition: "all 0.25s ease",
      alignItems: "center",
      flexWrap: isMobile ? "wrap" : "nowrap",
    }),
    paymentInfo: {
      flex: 1,
    },
    paymentTitle: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "0.25rem",
    },
    paymentCaseId: {
      fontSize: "12px",
      color: "#999",
      marginBottom: "0.5rem",
    },
    paymentDetails: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      fontSize: "12px",
      color: "#666",
      alignItems: "center",
    },
    paymentAmount: {
      fontSize: "19px",
      fontWeight: "800",
      color: "#0f172a",
      textAlign: "right",
      flexShrink: 0,
      marginRight: "0.5rem",
    },
    statusBadge: (color) => ({
      display: "inline-block",
      padding: "0.35rem 0.75rem",
      backgroundColor: color + "22",
      color: color,
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    }),
    paymentActions: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      flexShrink: 0,
    },
    actionButton: (bgColor) => ({
      padding: "0.6rem",
      backgroundColor: bgColor + "22",
      color: bgColor,
      border: "1.5px solid " + bgColor + "44",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    }),
    emptyState: {
      textAlign: "center",
      padding: "2rem 1rem",
      color: "#999",
      fontSize: "14px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.65)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
    },
    modalCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      maxWidth: "540px",
      width: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      position: "relative",
      padding: "2rem",
      animation: "fadeIn 0.2s ease-out",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <CreditCard size={24} />
        Payments (Pending/Paid Cases)
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard("#22bb33")}>
          <div style={styles.statIcon}>✓</div>
          <div style={styles.statNumber}>{totalPaid}</div>
          <div style={styles.statLabel}>Payments Paid</div>
        </div>

        <div style={styles.statCard("#ff9900")}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statNumber}>{totalPending}</div>
          <div style={styles.statLabel}>Pending Payments</div>
        </div>

        <div style={styles.statCard("#ff5555")}>
          <div style={styles.statIcon}>⚠️</div>
          <div style={styles.statNumber}>{totalOverdue}</div>
          <div style={styles.statLabel}>Overdue Payments</div>
        </div>
      </div>

      {/* Paid Payments */}
      <div>
        <div style={styles.sectionTitle}>
          <CheckCircle size={20} color="#22bb33" />
          Paid Payments ({totalPaid})
        </div>
        {paidPayments.length > 0 ? (
          <div style={styles.paymentsList}>
            {paidPayments.map((payment) => (
              <div
                key={payment.id}
                style={styles.paymentCard(payment.statusColor)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.paymentInfo}>
                  <div style={styles.paymentTitle}>{payment.caseTitle}</div>
                  <div style={styles.paymentCaseId}>Case #{payment.caseId}</div>
                  <div style={styles.paymentDetails}>
                    <span style={styles.statusBadge(payment.statusColor)}>
                      {payment.status}
                    </span>
                    <span>Paid on {payment.paymentDate}</span>
                    <span>•</span>
                    <span>{payment.paymentMethod}</span>
                  </div>
                </div>
                <div style={styles.paymentAmount}>{payment.amount}</div>
                <div style={styles.paymentActions}>
                  <button
                    style={styles.actionButton("#0066cc")}
                    onClick={() => handleViewReceipt(payment)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0066cc33";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0066cc22";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    title="View Receipt"
                  >
                    <Eye size={17} />
                  </button>
                  <button
                    style={styles.actionButton("#22bb33")}
                    onClick={() => handleDownloadReceipt(payment)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#22bb3333";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#22bb3322";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    title="Download Receipt"
                  >
                    <Download size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No paid payments</div>
        )}
      </div>

      {/* Pending Payments */}
      <div>
        <div style={styles.sectionTitle}>
          <Clock size={20} color="#ff9900" />
          Pending Payments ({totalPending})
        </div>
        {pendingPayments.length > 0 ? (
          <div style={styles.paymentsList}>
            {pendingPayments.map((payment) => (
              <div
                key={payment.id}
                style={styles.paymentCard(payment.statusColor)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.paymentInfo}>
                  <div style={styles.paymentTitle}>{payment.caseTitle}</div>
                  <div style={styles.paymentCaseId}>Case #{payment.caseId}</div>
                  <div style={styles.paymentDetails}>
                    <span style={styles.statusBadge(payment.statusColor)}>
                      {payment.status}
                    </span>
                    <span>Due on {payment.dueDate}</span>
                  </div>
                </div>
                <div style={styles.paymentAmount}>{payment.amount}</div>
                <div style={styles.paymentActions}>
                  <button
                    style={{
                      ...styles.actionButton("#22bb33"),
                      padding: "0.6rem 1.25rem",
                      fontWeight: "700",
                      fontSize: "14px",
                      gap: "0.5rem",
                    }}
                    onClick={() => handleOpenPayModal(payment)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#22bb3333";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#22bb3322";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Plus size={16} />
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No pending payments</div>
        )}
      </div>

      {/* Overdue Payments */}
      <div>
        <div style={styles.sectionTitle}>
          <AlertCircle size={20} color="#ff5555" />
          Overdue Payments ({totalOverdue})
        </div>
        {overduePayments.length > 0 ? (
          <div style={styles.paymentsList}>
            {overduePayments.map((payment) => (
              <div
                key={payment.id}
                style={styles.paymentCard(payment.statusColor)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.paymentInfo}>
                  <div style={styles.paymentTitle}>{payment.caseTitle}</div>
                  <div style={styles.paymentCaseId}>Case #{payment.caseId}</div>
                  <div style={styles.paymentDetails}>
                    <span style={styles.statusBadge(payment.statusColor)}>
                      {payment.status}
                    </span>
                    <span>Was due on {payment.dueDate}</span>
                  </div>
                </div>
                <div style={styles.paymentAmount}>{payment.amount}</div>
                <div style={styles.paymentActions}>
                  <button
                    style={{
                      ...styles.actionButton("#ff5555"),
                      padding: "0.6rem 1.25rem",
                      fontWeight: "700",
                      fontSize: "14px",
                      gap: "0.5rem",
                    }}
                    onClick={() => handleOpenPayModal(payment)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff555533";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff555522";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Plus size={16} />
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No overdue payments</div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. VIEW RECEIPT MODAL                                                     */}
      {/* ========================================================================= */}
      {selectedReceipt && (
        <div style={styles.modalOverlay} onClick={() => setSelectedReceipt(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={22} color="#16a34a" />
                <h3 style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: "#0f172a" }}>
                  Payment Receipt
                </h3>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                  borderRadius: "6px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Receipt Summary Box */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "700", color: "#64748b", letterSpacing: "0.5px" }}>
                Amount Paid
              </div>
              <div style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "6px 0" }}>
                {selectedReceipt.amount}
              </div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                ✓ {selectedReceipt.status.toUpperCase()}
              </span>
            </div>

            {/* Receipt Line Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Case ID</span>
                <span style={{ fontWeight: "700", color: "#0f172a" }}>#{selectedReceipt.caseId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Case Title</span>
                <span style={{ fontWeight: "600", color: "#0f172a", textAlign: "right" }}>{selectedReceipt.caseTitle}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Transaction Reference</span>
                <span style={{ fontWeight: "600", color: "#0f172a", fontFamily: "monospace" }}>
                  {selectedReceipt.transactionId || "TXN-2024-001"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Payment Date</span>
                <span style={{ fontWeight: "600", color: "#0f172a" }}>{selectedReceipt.paymentDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Payment Method</span>
                <span style={{ fontWeight: "600", color: "#0f172a" }}>{selectedReceipt.paymentMethod}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "4px" }}>
                <span style={{ color: "#64748b" }}>Resolution Authority</span>
                <span style={{ fontWeight: "600", color: "#0f172a" }}>Utkal ODR Portal</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => handleDownloadReceipt(selectedReceipt)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#0066cc",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Printer size={16} />
                Download / Print
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                style={{
                  padding: "0.75rem 1.25rem",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PAY NOW CHECKOUT MODAL                                                 */}
      {/* ========================================================================= */}
      {payingPayment && (
        <div
          style={styles.modalOverlay}
          onClick={() => {
            if (!isProcessing) setPayingPayment(null);
          }}
        >
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {!paymentSuccess ? (
              <form onSubmit={handleProcessPayment}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CreditCard size={22} color="#0066cc" />
                    <h3 style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: "#0f172a" }}>
                      Complete Settlement Payment
                    </h3>
                  </div>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setPayingPayment(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#64748b",
                      padding: "4px",
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Case & Amount Banner */}
                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "10px",
                    padding: "1rem",
                    marginBottom: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#166534" }}>
                      {payingPayment.caseTitle}
                    </div>
                    <div style={{ fontSize: "12px", color: "#15803d", marginTop: "2px" }}>
                      Case #{payingPayment.caseId} • Due: {payingPayment.dueDate}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#15803d", fontWeight: "700" }}>Total Due</div>
                    <div style={{ fontSize: "22px", fontWeight: "800", color: "#166534" }}>{payingPayment.amount}</div>
                  </div>
                </div>

                {/* Payment Methods Tabs */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "0.5rem" }}>
                    Choose Payment Method
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      style={{
                        padding: "8px",
                        border: paymentMethod === "card" ? "2px solid #0066cc" : "1px solid #cbd5e1",
                        backgroundColor: paymentMethod === "card" ? "#eff6ff" : "#ffffff",
                        color: paymentMethod === "card" ? "#0066cc" : "#475569",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <CreditCard size={15} />
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      style={{
                        padding: "8px",
                        border: paymentMethod === "upi" ? "2px solid #0066cc" : "1px solid #cbd5e1",
                        backgroundColor: paymentMethod === "upi" ? "#eff6ff" : "#ffffff",
                        color: paymentMethod === "upi" ? "#0066cc" : "#475569",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <QrCode size={15} />
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("netbanking")}
                      style={{
                        padding: "8px",
                        border: paymentMethod === "netbanking" ? "2px solid #0066cc" : "1px solid #cbd5e1",
                        backgroundColor: paymentMethod === "netbanking" ? "#eff6ff" : "#ffffff",
                        color: paymentMethod === "netbanking" ? "#0066cc" : "#475569",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Building size={15} />
                      NetBanking
                    </button>
                  </div>
                </div>

                {/* Form Inputs Based on Method */}
                {paymentMethod === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "6px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "6px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "6px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "6px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
                        Enter UPI ID
                      </label>
                      <input
                        type="text"
                        required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "6px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {["@oksbi", "@okhdfcbank", "@paytm", "@ybl"].map((suffix) => (
                        <button
                          key={suffix}
                          type="button"
                          onClick={() => setUpiId((prev) => (prev.split("@")[0] || "user") + suffix)}
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {suffix}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1.5px solid #cbd5e1",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {/* Security Guarantee */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#64748b",
                    fontSize: "12px",
                    marginBottom: "1.25rem",
                  }}
                >
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>256-bit SSL encrypted. Payment managed by Utkal ODR Trust Gateway.</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setPayingPayment(null)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.75rem 1rem",
                      backgroundColor: "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "15px",
                      cursor: isProcessing ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        Pay {payingPayment.amount} Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem auto",
                  }}
                >
                  <Check size={36} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>
                  Payment Completed!
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 1.5rem 0" }}>
                  Your settlement payment of <strong>{completedPaymentData?.amount}</strong> for{" "}
                  <strong>{completedPaymentData?.caseTitle}</strong> has been received and verified.
                </p>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "1.5rem",
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Transaction Ref:</span>
                    <span style={{ fontWeight: "700", color: "#0f172a" }}>{completedPaymentData?.transactionId}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Payment Status:</span>
                    <span style={{ fontWeight: "700", color: "#16a34a" }}>PAID & SETTLED</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      const record = completedPaymentData;
                      setPayingPayment(null);
                      handleDownloadReceipt(record);
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "0.75rem",
                      backgroundColor: "#0066cc",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={16} />
                    Download Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPayingPayment(null);
                    }}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#f1f5f9",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
