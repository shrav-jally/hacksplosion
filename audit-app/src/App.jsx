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
  Database, Cpu, Activity, Users, Globe, Lock, X, Zap, ShieldAlert,
  CheckCircle2, Circle, UserCheck, ThumbsUp as Approve
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
  { id: 'INV-2026-9042', vendor: 'Nexus Consulting', amount: '$150,000', score: 98, reason: 'Unauthorized Vendor & No PO', action: 'Block Payment & Escalate', agent: 'Procurement Validation Agent' },
  { id: 'INV-2026-9081', vendor: 'TechGlobal Supplies', amount: '$45,000', score: 85, reason: 'Price Variance > 30%', action: 'Review Contract Terms', agent: 'Pricing Anomaly Agent' },
  { id: 'INV-2026-9114', vendor: 'Alpha Services Ltd', amount: '$12,500', score: 82, reason: 'Duplicate (Inv Date/Amt)', action: 'Reject Duplicate', agent: 'Duplicate Detection Agent' },
  { id: 'INV-2026-9205', vendor: 'Delta Logistics', amount: '$8,400', score: 76, reason: 'Weekend Entry & No GRN', action: 'Verify GRN', agent: 'Procurement Validation Agent' },
  { id: 'INV-2026-9311', vendor: 'Global Logistics', amount: '$52,100', score: 90, reason: 'Missing GSTIN', action: 'Hold Payment Pending KYC', agent: 'GST Compliance Agent' },
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

const agentFeedData = [
  { time: '14:02', agent: 'Procurement Validation Agent', color: '#dc2626', action: 'flagged INV-2026-9042', detail: 'Missing PO + Unauthorized Vendor', score: 98, type: 'flag' },
  { time: '14:05', agent: 'GST Compliance Agent', color: '#f59e0b', action: 'flagged INV-2026-8733', detail: 'GSTIN checksum mismatch — Invalid format', score: 87, type: 'flag' },
  { time: '14:07', agent: 'Vendor Intelligence Agent', color: '#f59e0b', action: 'analyzed Nexus Consulting', detail: 'Suspicious registration date — incorporated 2024', score: null, type: 'verify' },
  { time: '14:09', agent: 'Duplicate Detection Agent', color: '#dc2626', action: 'flagged INV-2026-9114', detail: 'Exact duplicate of INV-2026-0891 (2 days apart)', score: 82, type: 'flag' },
  { time: '14:12', agent: 'Pricing Anomaly Agent', color: '#f59e0b', action: 'flagged INV-2026-9081', detail: 'Unit price 31% above contract rate', score: 85, type: 'flag' },
  { time: '14:15', agent: 'Procurement Validation Agent', color: '#8cc63f', action: 'cleared INV-2026-9330', detail: 'PO + GRN + Invoice quantities matched', score: null, type: 'clear' },
  { time: '14:18', agent: 'Escalation Agent', color: '#0076a8', action: 'escalated INV-2026-9042 to Human Review', detail: 'High-risk threshold exceeded — CFO approval required', score: null, type: 'escalate' },
];

const vendorData = [
  {
    id: 'V-001', name: 'Nexus Consulting', gstin: 'Not Registered', riskScore: 94, riskBand: 'Critical',
    checks: [
      { label: 'MCA Registry', status: 'warn', detail: 'Incorporated Mar 2024 — 6 months old' },
      { label: 'GST Portal Status', status: 'warn', detail: 'Recently activated — no filing history' },
      { label: 'Website Presence', status: 'fail', detail: 'Domain not found — no online presence' },
      { label: 'Blacklist Cross-reference', status: 'fail', detail: 'Flagged in 2 industry watchlists' },
      { label: 'Related Vendor Flags', status: 'warn', detail: 'Shared director DIN with Alpha Services Ltd' },
    ],
    sources: ['MCA21 Registry', 'GST Portal', 'Brave Search', 'Exa.ai', 'Web Scraper'],
  },
  {
    id: 'V-002', name: 'TechGlobal Supplies', gstin: '27AABCT3518Q1ZV', riskScore: 62, riskBand: 'Medium',
    checks: [
      { label: 'MCA Registry', status: 'pass', detail: 'Active — incorporated 2018' },
      { label: 'GST Portal Status', status: 'warn', detail: 'GSTIN active but 2 returns missed (Q3, Q4 2025)' },
      { label: 'Website Presence', status: 'pass', detail: 'Domain active — SSL valid' },
      { label: 'Blacklist Cross-reference', status: 'pass', detail: 'No matches found' },
      { label: 'Related Vendor Flags', status: 'warn', detail: 'Common address with Global Logistics' },
    ],
    sources: ['MCA21 Registry', 'GST Portal', 'Brave Search', 'LinkedIn'],
  },
  {
    id: 'V-003', name: 'Delta Logistics', gstin: '07AADCD4291M1ZF', riskScore: 38, riskBand: 'Low',
    checks: [
      { label: 'MCA Registry', status: 'pass', detail: 'Active — incorporated 2011' },
      { label: 'GST Portal Status', status: 'pass', detail: 'Regular filer — all returns submitted' },
      { label: 'Website Presence', status: 'pass', detail: 'Domain active — established web presence' },
      { label: 'Blacklist Cross-reference', status: 'pass', detail: 'No matches found' },
      { label: 'Related Vendor Flags', status: 'pass', detail: 'No related party flags' },
    ],
    sources: ['MCA21 Registry', 'GST Portal', 'Brave Search'],
  },
  {
    id: 'V-004', name: 'Alpha Services Ltd', gstin: '29AADCA0987P1ZQ', riskScore: 79, riskBand: 'High',
    checks: [
      { label: 'MCA Registry', status: 'pass', detail: 'Active — incorporated 2020' },
      { label: 'GST Portal Status', status: 'fail', detail: 'GSTIN belongs to different entity name' },
      { label: 'Website Presence', status: 'warn', detail: 'Parked domain — no business content' },
      { label: 'Blacklist Cross-reference', status: 'pass', detail: 'No direct matches' },
      { label: 'Related Vendor Flags', status: 'warn', detail: 'Shared director DIN with Nexus Consulting' },
    ],
    sources: ['MCA21 Registry', 'GST Portal', 'Exa.ai', 'Web Scraper'],
  },
];

const reviewQueueData = [
  {
    id: 'ESC-001', invoiceId: 'INV-2026-9042', vendor: 'Nexus Consulting', amount: '$150,000',
    agent: 'Procurement Validation Agent', score: 98, priority: 'Critical',
    rule: 'RUL-002 — High Value Tx Approval (>₹10 Lakh)',
    evidence: 'No PO reference found in system. Vendor registered 6 months ago. Payment amount exceeds CFO approval threshold.',
    status: 'Pending',
  },
  {
    id: 'ESC-002', invoiceId: 'INV-2026-9311', vendor: 'Global Logistics', amount: '$52,100',
    agent: 'GST Compliance Agent', score: 90, priority: 'High',
    rule: 'RUL-001 — GSTIN Validation (Missing/Invalid)',
    evidence: 'GSTIN field empty. Tax amount of $9,378 claimed without valid registration. ITC eligibility at risk.',
    status: 'Pending',
  },
  {
    id: 'ESC-003', invoiceId: 'INV-2026-9081', vendor: 'TechGlobal Supplies', amount: '$45,000',
    agent: 'Pricing Anomaly Agent', score: 85, priority: 'High',
    rule: 'RUL-005 — Contract Price Variance (>20%)',
    evidence: 'Invoice unit price $45/unit vs contracted $34.35/unit. Variance 31%. GRN shows 1,000 units received.',
    status: 'Pending',
  },
  {
    id: 'ESC-004', invoiceId: 'INV-2026-9205', vendor: 'Delta Logistics', amount: '$8,400',
    agent: 'Procurement Validation Agent', score: 76, priority: 'Medium',
    rule: 'RUL-004 — Weekend Posting Detection',
    evidence: 'Invoice posted Saturday 14:32. No GRN record found. Manual entry flag raised.',
    status: 'Under Review',
  },
];

// --- GENW BADGE COMPONENT ---
const GenwBadge = ({ label }) => (
  <span className="genw-badge"><Zap size={10} style={{ marginRight: 3 }} />{label}</span>
);

// --- AGENT ACTIVITY FEED COMPONENT ---
const AgentActivityFeed = ({ entries }) => (
  <div className="agent-feed">
    {entries.map((e, i) => (
      <div key={i} className="agent-entry">
        <div className="agent-entry-top">
          <span className="agent-time">{e.time}</span>
          <span className="agent-name" style={{ color: e.color }}>{e.agent}</span>
        </div>
        <div className="agent-entry-action">{e.action}</div>
        <div className="agent-entry-detail">{e.detail}</div>
        {e.score && (
          <span className="agent-score-badge" style={{ background: e.score >= 90 ? '#fee2e2' : '#ffedd5', color: e.score >= 90 ? '#dc2626' : '#c2410c' }}>Risk {e.score}</span>
        )}
        {e.type === 'clear' && <span className="agent-clear-badge">Cleared</span>}
        {e.type === 'escalate' && <span className="agent-escalate-badge">Escalated</span>}
      </div>
    ))}
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [discrepancyModal, setDiscrepancyModal] = useState({ open: false, row: null });
  const [overrideModal, setOverrideModal] = useState({ open: false, itemId: null });
  const [overrideText, setOverrideText] = useState('');
  const [reviewStatuses, setReviewStatuses] = useState({});

  const handleOverrideSubmit = () => {
    setReviewStatuses(prev => ({ ...prev, [overrideModal.itemId]: 'overridden' }));
    setOverrideModal({ open: false, itemId: null });
    setOverrideText('');
  };

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
      <div style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '24px' }}>
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '4px' }}>
            <div className="panel-title" style={{ fontSize: '15px' }}>Agent-Flagged Escalation Queue</div>
          </div>
          <div style={{ marginBottom: '16px' }}><GenwBadge label="GenW Agent Builder" /></div>
          <table className="data-table">
            <thead><tr><th>Invoice ID</th><th>Vendor</th><th>Amount</th><th>Risk Score</th><th>Flagging Agent</th><th>Flag Reason</th><th>Action</th></tr></thead>
            <tbody>{highRiskTransactions.map((tx, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: 'var(--primary-color)', fontSize: '13px' }}>{tx.id}</td>
                <td style={{ fontSize: '13px' }}>{tx.vendor}</td>
                <td style={{ fontWeight: 500, fontSize: '13px' }}>{tx.amount}</td>
                <td><div style={{ display: 'inline-block', backgroundColor: tx.score > 90 ? 'var(--danger-color)' : (tx.score > 80 ? 'var(--warning-color)' : 'var(--text-muted)'), color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{tx.score}</div></td>
                <td><span className="agent-tag">{tx.agent}</span></td>
                <td style={{ color: 'var(--danger-color)', fontSize: '12px' }}>{tx.reason}</td>
                <td style={{ fontSize: '12px', fontWeight: 500 }}>{tx.action}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: 4 }}>Audit Intelligence Activity</div>
              <GenwBadge label="GenW Agent Builder" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="live-dot"></span>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>
          <AgentActivityFeed entries={agentFeedData} />
        </div>
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

  const matchingStatusStyle = (status) => {
    if (status === 'Match') return { border: '2px solid #16a34a', color: '#16a34a', background: '#f0fdf4' };
    if (status === 'Missing GRN') return { border: '2px dashed #dc2626', color: '#dc2626', background: '#fff5f5' };
    return { border: '2px solid #f59e0b', color: '#b45309', background: '#fffbeb' };
  };

  const renderMatching = () => (
    <div className="dashboard-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ gridColumn: 'span 2', display: 'grid', gap: '16px' }}>
          <div className="panel" style={{ padding: '20px' }}><div className="kpi-title">Transactions Checked</div><div className="kpi-value" style={{ fontSize: '32px' }}>42,840</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}><div className="kpi-title">Matched</div><div className="kpi-value" style={{ fontSize: '24px', color: '#16a34a' }}>38,120</div></div>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}><div className="kpi-title">Discrepancies</div><div className="kpi-value" style={{ fontSize: '24px', color: 'var(--danger-color)' }}>4,720</div></div>
          </div>
        </div>
        <div className="panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: 4 }}>Three-Way Matching Pipeline</div>
              <GenwBadge label="GenW Agent Builder" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #16a34a', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={28} color="#16a34a" /></div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Purchase Order</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>SOURCE</span>
            </div>
            <div style={{ color: 'var(--accent-color)' }}><ArrowRight size={28} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #f59e0b', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={28} color="#b45309" /></div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Goods Receipt Note</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>DELIVERY</span>
            </div>
            <div style={{ color: 'var(--accent-color)' }}><ArrowRight size={28} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #dc2626', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Receipt size={28} color="#dc2626" /></div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Vendor Invoice</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>BILLING</span>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span> Matched</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span> Mismatch</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, border: '2px dashed #dc2626', borderRadius: '50%', display: 'inline-block' }}></span> Missing Document</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '72% 28%', gap: '24px' }}>
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Matching Results</div></div>
          <table className="data-table">
            <thead><tr><th>PO Number</th><th>Invoice Number</th><th>GRN Ref</th><th style={{ textAlign: 'right' }}>PO Qty</th><th style={{ textAlign: 'right' }}>Recv Qty</th><th style={{ textAlign: 'right' }}>Billed Qty</th><th>Status</th><th></th></tr></thead>
            <tbody>{matchingResults.map((row, i) => (
              <tr key={i}>
                <td style={{ fontSize: '13px' }}>{row.po}</td>
                <td style={{ fontSize: '13px', fontWeight: 500 }}>{row.invoice}</td>
                <td style={{ fontSize: '13px', fontStyle: row.grn === 'Missing' ? 'italic' : 'normal', color: row.grn === 'Missing' ? 'var(--danger-color)' : 'inherit' }}>{row.grn}</td>
                <td style={{ fontSize: '13px', textAlign: 'right' }}>{row.poQty}</td>
                <td style={{ fontSize: '13px', textAlign: 'right', color: row.recvQty !== row.poQty ? 'var(--danger-color)' : 'inherit', fontWeight: row.recvQty !== row.poQty ? 700 : 400 }}>{row.recvQty}</td>
                <td style={{ fontSize: '13px', textAlign: 'right', color: row.billsQty !== row.poQty ? 'var(--warning-color)' : 'inherit', fontWeight: row.billsQty !== row.poQty ? 700 : 400 }}>{row.billsQty}</td>
                <td>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', ...matchingStatusStyle(row.status) }}>{row.status}</span>
                </td>
                <td>
                  {row.status !== 'Match' && (
                    <button className="detail-btn" onClick={() => setDiscrepancyModal({ open: true, row })}>View Detail</button>
                  )}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px' }}><div className="panel-title" style={{ fontSize: '15px' }}>Top Discrepancy Themes</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{matchingExceptions.map((exc, i) => (
            <div key={i} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{exc.vendor}</div>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: exc.severity === 'Critical' ? '#fee2e2' : '#ffedd5', color: exc.severity === 'Critical' ? '#991b1b' : '#c2410c' }}>{exc.severity}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exc.issue}</div>
            </div>
          ))}</div>
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
          <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '24px' }}><div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--danger-color)', marginBottom: '8px' }}>Active Rule Overlay</div><div style={{ fontSize: '14px', fontWeight: 600 }}>"Transaction less than ₹10 Lakh requires CFO + CEO approval."</div></div>
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
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: 4 }}>Realm AI Audit Assistant</div>
              <GenwBadge label="GenW Realm AI" />
            </div>
          </div>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#fff', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Why was INV-9042 blocked?', 'Show Nexus Consulting flags', 'What rules triggered today?', 'Summarize this month\'s risk'].map((chip, i) => (
              <button key={i} className="query-chip">{chip}</button>
            ))}
          </div>
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

  const renderVendors = () => (
    <div className="dashboard-content">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 6 }}>Vendor Intelligence Verification</h2>
            <GenwBadge label="External Intelligence Agent" />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
            <div style={{ fontWeight: 600 }}>Data Sources</div>
            <div>MCA21 · GST Portal · Brave Search · Exa.ai · Web Scraper</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {vendorData.map((vendor) => {
          const bandColor = vendor.riskBand === 'Critical' ? '#dc2626' : vendor.riskBand === 'High' ? '#ea580c' : vendor.riskBand === 'Medium' ? '#f59e0b' : '#16a34a';
          const bandBg = vendor.riskBand === 'Critical' ? '#fee2e2' : vendor.riskBand === 'High' ? '#fff0eb' : vendor.riskBand === 'Medium' ? '#fffbeb' : '#f0fdf4';
          return (
            <div key={vendor.id} className="vendor-card" style={{ borderTop: `4px solid ${bandColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>{vendor.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>GSTIN: {vendor.gstin}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: bandColor }}>{vendor.riskScore}</div>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: bandBg, color: bandColor }}>{vendor.riskBand} RISK</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {vendor.checks.map((chk, ci) => {
                  const icon = chk.status === 'pass'
                    ? <CheckCircle size={14} color="#16a34a" />
                    : chk.status === 'warn'
                    ? <AlertTriangle size={14} color="#f59e0b" />
                    : <XCircle size={14} color="#dc2626" />;
                  const labelColor = chk.status === 'pass' ? '#16a34a' : chk.status === 'warn' ? '#b45309' : '#dc2626';
                  return (
                    <div key={ci} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 6, background: '#f8fafc', border: '1px solid var(--border-color)' }}>
                      <div style={{ marginTop: 1 }}>{icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: labelColor }}>{chk.label}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>{chk.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Intelligence Sources</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {vendor.sources.map((src, si) => (
                    <span key={si} style={{ fontSize: '11px', padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-muted)' }}>{src}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderReview = () => {
    const handleAction = (itemId, action) => {
      if (action === 'override') {
        setOverrideModal({ open: true, itemId });
      } else {
        setReviewStatuses(prev => ({ ...prev, [itemId]: action }));
      }
    };
    return (
      <div className="dashboard-content">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 6 }}>Audit Escalation Queue</h2>
          <GenwBadge label="Human-in-the-Loop Governance" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reviewQueueData.map((item) => {
            const resolved = reviewStatuses[item.id];
            const priorityColor = item.priority === 'Critical' ? '#dc2626' : item.priority === 'High' ? '#ea580c' : '#f59e0b';
            const priorityBg = item.priority === 'Critical' ? '#fee2e2' : item.priority === 'High' ? '#fff0eb' : '#fffbeb';
            return (
              <div key={item.id} className="review-card" style={{ borderLeft: `4px solid ${priorityColor}`, opacity: resolved ? 0.65 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-color)' }}>{item.invoiceId}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: priorityBg, color: priorityColor }}>{item.priority}</span>
                        {resolved && <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: resolved === 'approved' ? '#dcfce7' : resolved === 'rejected' ? '#fee2e2' : '#fef3c7', color: resolved === 'approved' ? '#16a34a' : resolved === 'rejected' ? '#dc2626' : '#b45309' }}>{resolved.toUpperCase()}</span>}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 4 }}>{item.vendor} &nbsp;·&nbsp; {item.amount}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: priorityColor }}>{item.score}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 6 }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Flagging Agent</div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}><span className="agent-tag">{item.agent}</span></div>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 6 }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Policy Rule Triggered</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--danger-color)' }}>{item.rule}</div>
                  </div>
                </div>
                <div style={{ padding: '12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, marginBottom: 16 }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#b45309', marginBottom: 4 }}>Evidence Summary</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{item.evidence}</div>
                </div>
                {!resolved && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="review-btn approve" onClick={() => handleAction(item.id, 'approved')}><CheckCircle size={14} /> Approve Investigation</button>
                    <button className="review-btn reject" onClick={() => handleAction(item.id, 'rejected')}><XCircle size={14} /> Reject Flag</button>
                    <button className="review-btn override" onClick={() => handleAction(item.id, 'override')}><Lock size={14} /> Override with Justification</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
      {/* Discrepancy Modal */}
      {discrepancyModal.open && discrepancyModal.row && (
        <div className="modal-overlay" onClick={() => setDiscrepancyModal({ open: false, row: null })}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>Discrepancy Detail — {discrepancyModal.row.po}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>Three-Way Match Analysis</div>
              </div>
              <button className="modal-close" onClick={() => setDiscrepancyModal({ open: false, row: null })}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              {[{ label: 'PO Quantity', qty: discrepancyModal.row.poQty, color: '#0b2241', bg: '#f0f4ff' },
                { label: 'GRN (Received)', qty: discrepancyModal.row.recvQty, color: discrepancyModal.row.recvQty !== discrepancyModal.row.poQty ? '#dc2626' : '#16a34a', bg: discrepancyModal.row.recvQty !== discrepancyModal.row.poQty ? '#fee2e2' : '#f0fdf4' },
                { label: 'Billed (Invoice)', qty: discrepancyModal.row.billsQty, color: discrepancyModal.row.billsQty !== discrepancyModal.row.poQty ? '#f59e0b' : '#16a34a', bg: discrepancyModal.row.billsQty !== discrepancyModal.row.poQty ? '#fffbeb' : '#f0fdf4' },
              ].map((col, ci) => (
                <div key={ci} style={{ padding: 16, borderRadius: 8, background: col.bg, textAlign: 'center', border: `2px solid ${col.color}20` }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>{col.label}</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: col.color }}>{col.qty}</div>
                </div>
              ))}
            </div>
            {discrepancyModal.row.recvQty !== discrepancyModal.row.poQty && (
              <div style={{ padding: '12px 16px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>
                  ⚠ GRN Delta: {discrepancyModal.row.poQty - discrepancyModal.row.recvQty} units not received
                </div>
              </div>
            )}
            {discrepancyModal.row.billsQty !== discrepancyModal.row.recvQty && (
              <div style={{ padding: '12px 16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#b45309' }}>
                  ⚠ Overbilling Delta: {discrepancyModal.row.billsQty - discrepancyModal.row.recvQty} units billed but not received
                </div>
              </div>
            )}
            {discrepancyModal.row.grn === 'Missing' && (
              <div style={{ padding: '12px 16px', background: '#fee2e2', border: '2px dashed #dc2626', borderRadius: 6 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>❌ GRN not found in system — payment should be blocked until GRN is submitted</div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Override Modal */}
      {overrideModal.open && (
        <div className="modal-overlay" onClick={() => setOverrideModal({ open: false, itemId: null })}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>Override with Justification</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>Human-in-the-Loop &mdash; Audit Trail Record</div>
              </div>
              <button className="modal-close" onClick={() => setOverrideModal({ open: false, itemId: null })}><X size={18} /></button>
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: '13px', color: '#b45309' }}>This override will be logged in the Audit Trail with your credentials, timestamp, and justification text.</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: 8 }}>Justification Reason <span style={{ color: 'var(--danger-color)' }}>*</span></label>
              <textarea
                rows={4}
                style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: 6, padding: '10px 12px', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
                placeholder="State the business reason for overriding this flag..."
                value={overrideText}
                onChange={e => setOverrideText(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="review-btn reject" onClick={() => setOverrideModal({ open: false, itemId: null })}>Cancel</button>
              <button className="review-btn approve" onClick={handleOverrideSubmit} disabled={!overrideText.trim()}>Submit Override &amp; Log</button>
            </div>
          </div>
        </div>
      )}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-accent"></div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.2 }}>AuditIQ</div>
            <div style={{ fontSize: '10px', fontWeight: 400, opacity: 0.6, marginTop: 2 }}>Powered by GenW.AI</div>
          </div>
        </div>
        <div className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={18} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}><UploadCloud size={18} /> Data Ingestion</div>
          <div className={`nav-item ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => setActiveTab('matching')}><FileDigit size={18} /> Three-Way Matching</div>
          <div className={`nav-item ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}><CheckSquare size={18} /> Policy Rules Engine</div>
          <div className={`nav-item ${activeTab === 'compliance' ? 'active' : ''}`} onClick={() => setActiveTab('compliance')}><ShieldCheck size={18} /> Compliance Checks</div>
          <div className={`nav-item ${activeTab === 'vendors' ? 'active' : ''}`} onClick={() => setActiveTab('vendors')}><Globe size={18} /> Vendor Intelligence</div>
          <div className={`nav-item ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')} style={{ position: 'relative' }}>
            <Users size={18} /> Human Review Queue
            <span style={{ marginLeft: 'auto', background: '#dc2626', color: '#fff', fontSize: '10px', fontWeight: 700, borderRadius: '10px', padding: '1px 6px' }}>4</span>
          </div>
          <div className={`nav-item ${activeTab === 'assistant' ? 'active' : ''}`} onClick={() => setActiveTab('assistant')}><Bot size={18} /> Realm AI Assistant</div>
          <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}><FileText size={18} /> Audit Reports</div>
        </div>
      </div>
      <div className="main-content">
        <div className="topbar">
          <div className="page-title">AuditIQ &mdash; AI-Powered Audit Intelligence</div>
          <div className="topbar-actions" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <div className="user-profile"><div className="avatar">JD</div>John Doe<ChevronDown size={14} color="var(--text-muted)" /></div>
          </div>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'upload' && renderUpload()}
        {activeTab === 'matching' && renderMatching()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'compliance' && renderCompliance()}
        {activeTab === 'vendors' && renderVendors()}
        {activeTab === 'review' && renderReview()}
        {activeTab === 'assistant' && renderAssistant()}
        {activeTab === 'reports' && renderReports()}

      </div>
    </div>
  );
}

export default App;
