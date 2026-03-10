import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  LayoutDashboard, UploadCloud, FileDigit, ShieldCheck,
  AlertTriangle, Bot, FileText, Search, Settings,
  Calendar, Building2, User, ChevronDown, CheckSquare,
  FileSpreadsheet, CheckCircle, RefreshCw, XCircle, FilePlus,
  ArrowRight, Package, Receipt, ToggleRight, Edit3, Plus, GitBranch,
  ArrowDown, Send, MessageSquare, ExternalLink, ThumbsUp, ThumbsDown, Copy,
  Database, Cpu
} from 'lucide-react';

// --- MOCK DATA ---
const trendData = [
  { name: 'Jan', anomalies: 45, transactions: 12000 }, { name: 'Feb', anomalies: 52, transactions: 11500 },
  { name: 'Mar', anomalies: 89, transactions: 14200 }, { name: 'Apr', anomalies: 61, transactions: 13800 },
  { name: 'May', anomalies: 120, transactions: 15100 }, { name: 'Jun', anomalies: 74, transactions: 12900 },
];
const riskDistData = [
  { name: 'High', value: 340, color: '#dc2626' }, { name: 'Medium', value: 1250, color: '#f59e0b' }, { name: 'Low', value: 8400, color: '#8cc63f' },
];
const duplicateData = [
  { x: 10, y: 30, z: 200 }, { x: 20, y: 50, z: 260 }, { x: 30, y: 70, z: 400 },
  { x: 40, y: 50, z: 280 }, { x: 50, y: 90, z: 500 },
];
const heatmapData = [
  { name: 'V-012', compliance: 80, duplicates: 40, amtRisk: 90 }, { name: 'V-045', compliance: 40, duplicates: 80, amtRisk: 50 },
  { name: 'V-088', compliance: 60, duplicates: 30, amtRisk: 70 }, { name: 'V-102', compliance: 90, duplicates: 90, amtRisk: 100 },
];
const highRiskTransactions = [
  { id: 'INV-2026-9042', vendor: 'Nexus Consulting', amount: '$150,000', score: 98, reason: 'Unauthorized Vendor & No PO', action: 'Block Payment & Escalate' },
  { id: 'INV-2026-9081', vendor: 'TechGlobal Supplies', amount: '$45,000', score: 85, reason: 'Price Variance > 30%', action: 'Review Contract Terms' },
  { id: 'INV-2026-9114', vendor: 'Alpha Services Ltd', amount: '$12,500', score: 82, reason: 'Duplicate (Inv Date/Amt)', action: 'Reject Duplicate' },
  { id: 'INV-2026-9205', vendor: 'Delta Logistics', amount: '$8,400', score: 76, reason: 'Weekend Entry & No GRN', action: 'Verify GRN' },
  { id: 'INV-2026-9311', vendor: 'Global Logistics', amount: '$52,100', score: 90, reason: 'Missing GSTIN', action: 'Hold Payment Pending KYC' },
];
const sampleDataPreview = [
  { id: 'TXN-90981', date: '2026-06-12', vendor: 'Omega Corp', poRef: 'PO-2026-88', total: '12,500.00', currency: 'USD', gst: 'Valid' },
  { id: 'TXN-90982', date: '2026-06-12', vendor: 'TechGlobal', poRef: 'PO-2026-89', total: '45,000.00', currency: 'USD', gst: 'Invalid Format' },
  { id: 'TXN-90983', date: '12/06/2026', vendor: 'alpha services.', poRef: 'Missing', total: '12,500', currency: 'EUR', gst: 'Valid' },
  { id: 'TXN-90984', date: '2026-06-13', vendor: 'Office Needs Inc', poRef: 'PO-2026-91', total: '3,200.00', currency: 'USD', gst: 'Valid' },
];
const matchingResults = [
  { po: 'PO-2026-88', invoice: 'INV-90981', grn: 'GRN-5541', poQty: 100, recvQty: 100, billsQty: 100, status: 'Match' },
  { po: 'PO-2026-89', invoice: 'INV-90982', grn: 'GRN-5542', poQty: 500, recvQty: 400, billsQty: 500, status: 'Quantity Mismatch' },
  { po: 'PO-2026-90', invoice: 'INV-90985', grn: 'Missing', poQty: 200, recvQty: 0, billsQty: 200, status: 'Missing GRN' },
];
const matchingExceptions = [
  { vendor: 'TechGlobal Supplies', issue: 'Overbilling (Qty 100 Diff)', severity: 'High' },
  { vendor: 'Nexus Consulting', issue: 'Missing GRN for $150k Payment', severity: 'Critical' },
];
const auditRules = [
  { id: 'RUL-001', name: 'Duplicate Invoice Detection', type: 'Fraud Prevention', desc: 'Flags exact matches within 30 days.', severity: 'High', status: 'Active' },
  { id: 'RUL-002', name: 'High Value Tx Approval', type: 'Compliance', desc: 'Checks if transactions > ₹10 Lakh have CFO/CEO sig.', severity: 'Critical', status: 'Active' },
  { id: 'RUL-003', name: 'Round Number Entry Check', type: 'Anomaly Detection', desc: 'Identifies non-payroll transactions ending in ,000 or ,500', severity: 'Medium', status: 'Active' },
  { id: 'RUL-004', name: 'Weekend Posting Detection', type: 'Policy Violation', desc: 'Flags manual journal entries posted on Sat/Sun', severity: 'Medium', status: 'Active' },
];
const vendorComplianceData = [
  { name: 'Nexus Cons.', missing: 45, invalid: 20, mismatch: 50 }, { name: 'TechGlobal', missing: 10, invalid: 30, mismatch: 20 },
  { name: 'Delta Log.', missing: 25, invalid: 5, mismatch: 15 }, { name: 'Alpha Svc.', missing: 5, invalid: 15, mismatch: 10 },
  { name: 'Global Log.', missing: 30, invalid: 10, mismatch: 40 },
];
const taxTrendData = [
  { name: 'Jan', consistency: 92 }, { name: 'Feb', consistency: 94 }, { name: 'Mar', consistency: 89 },
  { name: 'Apr', consistency: 95 }, { name: 'May', consistency: 97 }, { name: 'Jun', consistency: 91 },
];
const complianceIssues = [
  { id: 'INV-2026-8012', vendor: 'Global Logistics', gstStatus: 'Missing', taxAmt: '$9,378.00', issue: 'Tax amt without valid GSTIN', risk: 'High' },
  { id: 'INV-2026-8055', vendor: 'Delta Logistics', gstStatus: 'Invalid Format', taxAmt: '$1,512.00', issue: 'GSTIN fails checksum validation', risk: 'High' },
  { id: 'INV-2026-8109', vendor: 'TechGlobal Supplies', gstStatus: 'Valid', taxAmt: '$8,100.00', issue: 'Calculated tax (18%) mismatches invoice total', risk: 'Medium' },
  { id: 'INV-2026-8144', vendor: 'Alpha Services Ltd', gstStatus: 'Mismatch', taxAmt: '$2,250.00', issue: 'GSTIN belongs to different entity', risk: 'High' },
  { id: 'INV-2026-8201', vendor: 'Nexus Consulting', gstStatus: 'Valid', taxAmt: '$27,000.00', issue: 'Reverse charge conflict', risk: 'Medium' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Total Invoices Processed</div><div className="kpi-value">42,840</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
          <div className="kpi-title">High Risk Transactions</div><div className="kpi-value">340</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Duplicate Invoice Alerts</div><div className="kpi-value">128</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Compliance Violations</div><div className="kpi-value">845</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Vendors Flagged</div><div className="kpi-value">42</div>
        </div>
      </div>
      <div className="panels-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Vendor Risk Matrix</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer><BarChart data={heatmapData} layout="vertical">
              <XAxis type="number" hide /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={50} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="amtRisk" stackId="a" fill="#0076a8" /><Bar dataKey="compliance" stackId="a" fill="#8cc63f" /><Bar dataKey="duplicates" stackId="a" fill="#dc2626" />
            </BarChart></ResponsiveContainer>
          </div>
        </div>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Monthly Anomaly Trend</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer><LineChart data={trendData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip /><Line type="monotone" dataKey="anomalies" stroke="var(--danger-color)" strokeWidth={3} />
            </LineChart></ResponsiveContainer>
          </div>
        </div>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Risk Category Dist.</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer><PieChart><Pie data={riskDistData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
              {riskDistData.map((e, index) => (<Cell key={`cell-${index}`} fill={e.color} />))}
            </Pie><Tooltip /></PieChart></ResponsiveContainer>
          </div>
        </div>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Duplicate Clusters</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer><ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <XAxis type="number" dataKey="x" hide /><YAxis type="number" dataKey="y" hide /><ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip /><Scatter data={duplicateData} fill="var(--warning-color)" opacity={0.7} />
            </ScatterChart></ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="panels-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--danger-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Top High-Risk Vendors</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}><span>Nexus Consulting</span> <strong style={{ color: 'var(--danger-color)' }}>98 pts</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}><span>Global Logistics</span> <strong style={{ color: 'var(--danger-color)' }}>84 pts</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}><span>TechGlobal Supplies</span> <strong style={{ color: 'var(--warning-color)' }}>76 pts</strong></li>
          </ul>
        </div>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--warning-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Transactions Missing GSTIN</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>342</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Flagged in last 30 days</div>
        </div>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--primary-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Approval Policy Violations</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>89</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Signatures missing or bypassed</div>
        </div>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--accent-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Weekend Financial Entries</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>1,204</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Requires manual justification</div>
        </div>
      </div>
      <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>High Risk Transactions Table</div></div>
        <table className="data-table"><thead><tr><th>Invoice ID</th><th>Vendor</th><th>Amount</th><th>Risk Score</th><th>Flag Reason</th><th>Suggested Action</th></tr></thead>
          <tbody>{highRiskTransactions.map((tx, i) => (<tr key={i}><td style={{ fontWeight: 500, color: 'var(--primary-color)' }}>{tx.id}</td><td>{tx.vendor}</td><td style={{ fontWeight: 500 }}>{tx.amount}</td><td><div style={{ display: 'inline-block', backgroundColor: tx.score > 90 ? 'var(--danger-color)' : (tx.score > 80 ? 'var(--warning-color)' : 'var(--text-muted)'), color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{tx.score}</div></td><td style={{ color: 'var(--danger-color)', fontSize: '13px' }}>{tx.reason}</td><td style={{ fontSize: '13px', fontWeight: 500 }}>{tx.action}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="dashboard-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary-color)' }}><div className="kpi-title">Records Uploaded</div><div className="kpi-value">128,450</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}><div className="kpi-title">Records Standardized</div><div className="kpi-value">128,211</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">Errors Detected</div><div className="kpi-value">239</div></div>
      </div>
      <div className="panel" style={{ marginBottom: '24px', padding: '24px' }}><div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '20px' }}><div className="panel-title" style={{ fontSize: '15px' }}>GenW AppMaker Data Connectors</div></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {["Invoice Data", "Purchase Orders", "GRN Files", "Vendor Master", "Approval Logs"].map((title, i) => (
            <div key={i} style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '24px 16px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
              <div style={{ marginBottom: '12px' }}><FileSpreadsheet size={24} color="var(--primary-color)" /></div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>{title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>CSV, Excel, ERP export</div>
              <button style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, color: 'var(--text-dark)', cursor: 'pointer', margin: '0 auto' }}>Browse</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
        <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Data Preview</div></div>
          <table className="data-table"><thead><tr><th>Invoice ID</th><th>Date</th><th>Vendor</th><th>PO Ref</th><th>Amount</th><th>GST</th></tr></thead>
            <tbody>{sampleDataPreview.map((row, i) => (<tr key={i}><td style={{ fontWeight: 500, color: 'var(--primary-color)' }}>{row.id}</td><td style={{ fontSize: '13px' }}>{row.date}</td><td style={{ fontSize: '13px' }}>{row.vendor}</td><td style={{ fontSize: '13px' }}>{row.poRef}</td><td style={{ fontSize: '13px', fontWeight: 500 }}>{row.total}</td><td>{row.gst === 'Valid' ? <span style={{ color: 'var(--secondary-color)', fontSize: '12px' }}>Valid</span> : <span style={{ color: 'var(--danger-color)', fontSize: '12px' }}>Invalid</span>}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Standardization</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }}><CheckCircle size={18} color="var(--secondary-color)" /><div><div style={{ fontSize: '14px', fontWeight: 600 }}>Vendor Name Normalization</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Unified 34 variations</div></div></div>
            <div style={{ display: 'flex', gap: '12px' }}><CheckCircle size={18} color="var(--secondary-color)" /><div><div style={{ fontSize: '14px', fontWeight: 600 }}>Invoice Date Formatting</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Converted to ISO 8601</div></div></div>
            <div style={{ display: 'flex', gap: '12px' }}><AlertTriangle size={18} color="var(--warning-color)" /><div><div style={{ fontSize: '14px', fontWeight: 600 }}>GST Field Validation</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>239 invalid GSTINs found.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMatching = () => (
    <div className="dashboard-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ gridColumn: 'span 2', display: 'grid', gap: '16px' }}>
          <div className="panel" style={{ padding: '20px' }}><div className="kpi-title">Transactions Checked</div><div className="kpi-value" style={{ fontSize: '32px' }}>42,840</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}><div className="kpi-title">Matching Transactions</div><div className="kpi-value" style={{ fontSize: '24px' }}>38,120</div></div>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">Mismatched Records</div><div className="kpi-value" style={{ fontSize: '24px' }}>4,720</div></div>
          </div>
        </div>
        <div className="panel" style={{ gridColumn: 'span 3', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '24px' }}>Three-Way Matching Pipeline</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}><div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={28} color="var(--primary-color)" /></div><div style={{ fontSize: '13px', fontWeight: 600 }}>Purchase Order</div></div>
            <div style={{ color: 'var(--accent-color)', opacity: 0.5 }}><ArrowRight size={32} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}><div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={28} color="var(--primary-color)" /></div><div style={{ fontSize: '13px', fontWeight: 600 }}>Goods Receipt Note</div></div>
            <div style={{ color: 'var(--accent-color)', opacity: 0.5 }}><ArrowRight size={32} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}><div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Receipt size={28} color="var(--primary-color)" /></div><div style={{ fontSize: '13px', fontWeight: 600 }}>Vendor Invoice</div></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '75% 25%', gap: '24px' }}>
        <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Matching Results</div></div>
          <table className="data-table"><thead><tr><th>PO Number</th><th>Invoice Number</th><th>GRN Ref</th><th style={{ textAlign: 'right' }}>PO Qty</th><th style={{ textAlign: 'right' }}>Recv Qty</th><th style={{ textAlign: 'right' }}>Billed Qty</th><th>Status</th></tr></thead>
            <tbody>{matchingResults.map((row, i) => (<tr key={i}><td style={{ fontSize: '13px' }}>{row.po}</td><td style={{ fontSize: '13px', fontWeight: 500 }}>{row.invoice}</td><td style={{ fontSize: '13px' }}>{row.grn}</td><td style={{ fontSize: '13px', textAlign: 'right' }}>{row.poQty}</td><td style={{ fontSize: '13px', textAlign: 'right' }}>{row.recvQty}</td><td style={{ fontSize: '13px', textAlign: 'right' }}>{row.billsQty}</td><td><span className={`status-badge ${row.status === 'Match' ? 'status-low' : row.status === 'Missing GRN' ? 'status-high' : 'status-medium'}`}>{row.status}</span></td></tr>))}</tbody>
          </table>
        </div>
        <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Top Discrepancy Themes</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{matchingExceptions.map((exc, i) => (<div key={i} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#f8fafc' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><div style={{ fontSize: '13px', fontWeight: 600 }}>{exc.vendor}</div><span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: exc.severity === 'Critical' ? '#fee2e2' : '#ffedd5', color: exc.severity === 'Critical' ? '#991b1b' : '#c2410c' }}>{exc.severity}</span></div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exc.issue}</div></div>))}</div>
        </div>
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="dashboard-content">
      <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
        <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Active GenW Audit Rules</div></div>
          <table className="data-table"><thead><tr><th>Rule Name</th><th>Rule Type</th><th>Description</th><th>Severity</th><th>Status</th></tr></thead>
            <tbody>{auditRules.map((rule, i) => (<tr key={i}><td style={{ fontWeight: 600, fontSize: '13px' }}>{rule.name}</td><td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{rule.type}</td><td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rule.desc}</td><td><span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#f1f5f9' }}>{rule.severity}</span></td><td><div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--secondary-color)' }}>{rule.status}</div></td></tr>))}</tbody>
          </table>
        </div>
        <div className="panel" style={{ padding: '24px', borderTop: '4px solid var(--primary-color)' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Policy Enforcement Mapping</div>
          <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '24px' }}><div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--danger-color)', marginBottom: '8px' }}>Active Rule Overlay</div><div style={{ fontSize: '14px', fontWeight: 600 }}>"Transaction > ₹10 Lakh requires CFO + CEO approval."</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '13px', fontWeight: 500 }}>1. Dept Manager</div></div>
            <ArrowDown size={16} />
            <div style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '13px', fontWeight: 500 }}>2. Head of Finance</div></div>
            <ArrowDown size={16} color="var(--danger-color)" />
            <div style={{ width: '100%', padding: '16px', border: '2px solid var(--danger-color)', borderRadius: '4px', backgroundColor: '#fee2e2' }}><div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger-color)' }}>3. CFO Level</div><div style={{ fontSize: '11px', color: '#991b1b' }}>Mandatory Review</div></div>
            <ArrowDown size={16} color="var(--danger-color)" />
            <div style={{ width: '100%', padding: '16px', border: '2px solid var(--danger-color)', borderRadius: '4px', backgroundColor: '#fee2e2' }}><div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger-color)' }}>4. CEO Approval Desk</div></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssistant = () => (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '24px', flexGrow: 1, overflow: 'hidden' }}>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', padding: 0, height: '600px' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}><div style={{ fontSize: '13px', fontWeight: 600 }}>Suggested Query Prompts: Why is INV-203 flagged?</div></div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ maxWidth: '80%', padding: '12px 16px', backgroundColor: 'var(--primary-color)', color: '#fff', borderRadius: '8px 8px 0 8px', fontSize: '14px' }}>Can you explain why INV-203 from Alpha Services Ltd was flagged?</div></div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}><Bot size={18} color="#fff" /></div>
              <div style={{ maxWidth: '90%' }}><div style={{ fontSize: '14px', marginBottom: '16px' }}>Triggered: <span style={{ color: 'var(--danger-color)', fontWeight: 600 }}>Duplicate Invoice Detection</span>.</div>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '12px' }}>Flag Reason: Duplicate invoice detected within 2 days.</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '16px' }}><div>CURRENT INVOICE: INV-203</div><div>PRIOR RECORD: INV-089</div></div>
                  <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #8cc63f' }}><div style={{ fontSize: '13px', fontWeight: 500 }}>Suggested Audit Test: Verify physical copies.</div></div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}><input type="text" placeholder="Type query..." style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} /></div>
        </div>
        <div className="panel" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 600 }}>Supporting Data Panel</div>
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '12px' }}>Active Record: INV-203</div>
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', fontSize: '13px' }}>Vendor: Alpha Services Ltd<br />Amount: $12,500.00<br />PO Ref: PO-2026-11</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, margin: '24px 0 12px' }}>Evidence Citations</div>
            <div style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '13px', color: 'var(--primary-color)' }}>Original GL Extract [Row 429]</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="dashboard-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px' }}><div className="kpi-title">Total Transactions Analyzed</div><div className="kpi-value">42,840</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--warning-color)' }}><div className="kpi-title">Exceptions Found</div><div className="kpi-value">1,313</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">High Risk Items</div><div className="kpi-value">340</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-color)' }}><div className="kpi-title">Compliance Issues</div><div className="kpi-value">845</div></div>
      </div>
      <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Final Exception Report Table</div></div>
        <table className="data-table"><thead><tr><th>Transaction ID</th><th>Vendor</th><th>Issue Type</th><th>Risk Level</th><th>Recommended Action</th></tr></thead>
          <tbody>{highRiskTransactions.map((tx, i) => (<tr key={i}><td style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '13px' }}>{tx.id}</td><td style={{ fontSize: '13px' }}>{tx.vendor}</td><td style={{ fontSize: '13px', color: 'var(--danger-color)' }}>{tx.reason}</td><td><span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', backgroundColor: tx.score > 85 ? '#fee2e2' : '#ffedd5', color: tx.score > 85 ? '#991b1b' : '#c2410c' }}>{tx.score > 85 ? 'High' : 'Medium'}</span></td><td style={{ fontSize: '13px', fontWeight: 500 }}>{tx.action}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="dashboard-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">Missing GSTIN</div><div className="kpi-value">342</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">Invalid GSTIN</div><div className="kpi-value">84</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--warning-color)' }}><div className="kpi-title">Tax Mismatch</div><div className="kpi-value">1,205</div></div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}><div className="kpi-title">Eligible ITC Invoices</div><div className="kpi-value">38,912</div></div>
      </div>
      <div className="panels-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Compliance Violations by Vendor</div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer><BarChart data={vendorComplianceData}><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} /><Tooltip cursor={{ fill: 'transparent' }} /><Bar dataKey="missing" stackId="a" fill="#dc2626" name="Missing GSTIN" /><Bar dataKey="invalid" stackId="a" fill="#ea580c" name="Invalid Format" /><Bar dataKey="mismatch" stackId="a" fill="#f59e0b" name="Tax Mismatch" /></BarChart></ResponsiveContainer>
          </div>
        </div>
        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Tax Consistency Trend</div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer><LineChart data={taxTrendData}><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} /><YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} /><Tooltip /><Line type="monotone" dataKey="consistency" stroke="var(--primary-color)" strokeWidth={3} /></LineChart></ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="panel" style={{ padding: '24px' }}><div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Invoices with Compliance Issues</div></div>
        <table className="data-table"><thead><tr><th>Invoice ID</th><th>Vendor</th><th>GSTIN Status</th><th>Tax Amount</th><th>Issue</th><th>Risk Level</th></tr></thead>
          <tbody>{complianceIssues.map((tx, i) => (<tr key={i}><td style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '13px' }}>{tx.id}</td><td style={{ fontSize: '13px' }}>{tx.vendor}</td><td><span style={{ fontSize: '12px', fontWeight: 500, color: tx.gstStatus === 'Valid' ? 'var(--secondary-color)' : 'var(--danger-color)' }}>{tx.gstStatus}</span></td><td style={{ fontSize: '13px', fontWeight: 600 }}>{tx.taxAmt}</td><td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tx.issue}</td><td><span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', backgroundColor: tx.risk === 'High' ? '#fee2e2' : '#ffedd5', color: tx.risk === 'High' ? '#991b1b' : '#c2410c' }}>{tx.risk}</span></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-brand"><div className="brand-accent"></div><div><div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.2 }}>AI Internal Audit</div><div style={{ fontSize: '11px', fontWeight: 400, opacity: 0.7 }}>Assistant</div></div></div>
        <div className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={18} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}><UploadCloud size={18} /> Data Upload</div>
          <div className={`nav-item ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => setActiveTab('matching')}><FileDigit size={18} /> Document Matching</div>
          <div className={`nav-item ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}><CheckSquare size={18} /> Audit Rules</div>
          <div className={`nav-item ${activeTab === 'compliance' ? 'active' : ''}`} onClick={() => setActiveTab('compliance')}><ShieldCheck size={18} /> Compliance Checks</div>
          <div className={`nav-item ${activeTab === 'assistant' ? 'active' : ''}`} onClick={() => setActiveTab('assistant')}><Bot size={18} /> Audit Assistant</div>
          <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}><FileText size={18} /> Audit Reports</div>
        </div>
      </div>
      <div className="main-content">
        <div className="topbar">
          <div className="page-title">AI Internal Audit Assistant</div>
          <div className="topbar-actions" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <div className="user-profile"><div className="avatar">JD</div>John Doe<ChevronDown size={14} color="var(--text-muted)" /></div>
          </div>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'upload' && renderUpload()}
        {activeTab === 'matching' && renderMatching()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'compliance' && renderCompliance()}
        {activeTab === 'assistant' && renderAssistant()}
        {activeTab === 'reports' && renderReports()}

      </div>
    </div>
  );
}

export default App;
