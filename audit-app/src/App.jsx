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
  ArrowDown, Send, MessageSquare, ExternalLink, ThumbsUp, ThumbsDown, Copy
} from 'lucide-react';

const highRiskTransactions = [
  { id: 'INV-2026-9042', vendor: 'Nexus Consulting', amount: '$150,000', score: 98, reason: 'Unauthorized Vendor & No PO', action: 'Block Payment & Escalate' },
  { id: 'INV-2026-9081', vendor: 'TechGlobal Supplies', amount: '$45,000', score: 85, reason: 'Price Variance > 30%', action: 'Review Contract Terms' },
  { id: 'INV-2026-9114', vendor: 'Alpha Services Ltd', amount: '$12,500', score: 82, reason: 'Exact Duplicate (Inv Date/Amt)', action: 'Reject Duplicate' },
  { id: 'INV-2026-9205', vendor: 'Delta Logistics', amount: '$8,400', score: 76, reason: 'Weekend Entry & Missing GRN', action: 'Request GRN Verification' },
  { id: 'INV-2026-9311', vendor: 'Global Logistics', amount: '$52,100', score: 90, reason: 'Missing GSTIN', action: 'Hold Payment Pending KYC' },
];

const vendorComplianceData = [
  { name: 'Nexus Cons.', missing: 45, invalid: 20, mismatch: 50 },
  { name: 'TechGlobal', missing: 10, invalid: 30, mismatch: 20 },
  { name: 'Delta Log.', missing: 25, invalid: 5, mismatch: 15 },
  { name: 'Alpha Svc.', missing: 5, invalid: 15, mismatch: 10 },
  { name: 'Global Log.', missing: 30, invalid: 10, mismatch: 40 },
];

const taxTrendData = [
  { name: 'Jan', consistency: 92 },
  { name: 'Feb', consistency: 94 },
  { name: 'Mar', consistency: 89 },
  { name: 'Apr', consistency: 95 },
  { name: 'May', consistency: 97 },
  { name: 'Jun', consistency: 91 },
];

const complianceIssues = [
  { id: 'INV-2026-8012', vendor: 'Global Logistics', gstStatus: 'Missing', taxAmt: '$9,378.00', issue: 'Tax amount claimed without valid GSTIN', risk: 'High' },
  { id: 'INV-2026-8055', vendor: 'Delta Logistics', gstStatus: 'Invalid Format', taxAmt: '$1,512.00', issue: 'GSTIN fails checksum validation', risk: 'High' },
  { id: 'INV-2026-8109', vendor: 'TechGlobal Supplies', gstStatus: 'Valid', taxAmt: '$8,100.00', issue: 'Calculated tax (18%) mismatches invoice total', risk: 'Medium' },
  { id: 'INV-2026-8144', vendor: 'Alpha Services Ltd', gstStatus: 'Mismatch', taxAmt: '$2,250.00', issue: 'GSTIN belongs to different entity entity name', risk: 'High' },
  { id: 'INV-2026-8201', vendor: 'Nexus Consulting', gstStatus: 'Valid', taxAmt: '$27,000.00', issue: 'Reverse charge mechanism applicability conflict', risk: 'Medium' },
];

function App() {
  const [activeTab, setActiveTab] = useState('compliance');

  const renderDashboard = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);
  const renderUpload = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);
  const renderMatching = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);
  const renderRules = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);
  const renderAssistant = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);
  const renderReports = () => (<div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>{/* omitted */}</div>);

  const renderCompliance = () => (
    <div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>Statutory & Tax Compliance Verification</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Automated GST Validation and Input Tax Credit (ITC) reconciliation pipeline.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: '#fff', color: 'var(--text-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Re-run Tax Validation
          </button>
        </div>
      </div>

      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
          <div className="kpi-title">Missing GSTIN</div>
          <div className="kpi-value">342</div>
          <div className="kpi-change negative" style={{ fontSize: '12px', marginTop: '4px' }}>$124k tax risk</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
          <div className="kpi-title">Invalid GSTIN</div>
          <div className="kpi-value">84</div>
          <div className="kpi-change negative" style={{ fontSize: '12px', marginTop: '4px' }}>Checksum/Format failures</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--warning-color)' }}>
          <div className="kpi-title">Tax Mismatch</div>
          <div className="kpi-value">1,205</div>
          <div className="kpi-change negative" style={{ fontSize: '12px', marginTop: '4px' }}>Invoice vs Calculated Rate</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}>
          <div className="kpi-title">Eligible ITC Invoices</div>
          <div className="kpi-value">38,912</div>
          <div className="kpi-change positive" style={{ fontSize: '12px', marginTop: '4px' }}>$4.2M cleared for credit</div>
        </div>
      </div>

      <div className="panels-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>Compliance Violations by Vendor</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Top 5 vendors by statutory risk volume</div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={vendorComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="missing" stackId="a" fill="#dc2626" name="Missing GSTIN" />
                <Bar dataKey="invalid" stackId="a" fill="#ea580c" name="Invalid Format" />
                <Bar dataKey="mismatch" stackId="a" fill="#f59e0b" name="Tax Mismatch" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>Tax Consistency Trend</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Month-over-month % of invoices passing all tax rules</div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={taxTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Consistency']} />
                <Line type="monotone" dataKey="consistency" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="panel" style={{ padding: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
          <div>
            <div className="panel-title" style={{ fontSize: '15px' }}>Invoices with Compliance Issues</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Flagged exceptions requiring manual tax review</div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="search-box" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <Search size={14} color="var(--text-muted)" />
              <input type="text" placeholder="Search invoices..." style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '12px' }} />
            </div>
            <div style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Filter by Status <ChevronDown size={12} />
            </div>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Vendor</th>
              <th>GSTIN Status</th>
              <th>Tax Amount</th>
              <th style={{ width: '35%' }}>Issue</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {complianceIssues.map((tx, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '13px' }}>{tx.id}</td>
                <td style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{tx.vendor}</td>
                <td>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500,
                    color: tx.gstStatus === 'Valid' ? 'var(--secondary-color)' : 'var(--danger-color)'
                  }}>
                    {tx.gstStatus === 'Valid' ? <CheckCircle size={14} /> : <XCircle size={14} />} {tx.gstStatus}
                  </span>
                </td>
                <td style={{ fontSize: '13px', fontWeight: 600 }}>{tx.taxAmt}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tx.issue}</td>
                <td>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', textTransform: 'uppercase',
                    backgroundColor: tx.risk === 'High' ? '#fee2e2' : '#ffedd5',
                    color: tx.risk === 'High' ? '#991b1b' : '#c2410c'
                  }}>
                    {tx.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-accent"></div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.2 }}>AI Internal Audit</div>
            <div style={{ fontSize: '11px', fontWeight: 400, opacity: 0.7 }}>Assistant</div>
          </div>
        </div>
        <div className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
            <UploadCloud size={18} /> Data Upload
          </div>
          <div className={`nav-item ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => setActiveTab('matching')}>
            <FileDigit size={18} /> Document Matching
          </div>
          <div className={`nav-item ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>
            <CheckSquare size={18} /> Audit Rules
          </div>
          <div className={`nav-item ${activeTab === 'compliance' ? 'active' : ''}`} onClick={() => setActiveTab('compliance')}>
            <ShieldCheck size={18} /> Compliance Checks
          </div>
          <div className={`nav-item ${activeTab === 'risk' ? 'active' : ''}`} onClick={() => setActiveTab('risk')}>
            <AlertTriangle size={18} /> Risk Analysis
          </div>
          <div className={`nav-item ${activeTab === 'assistant' ? 'active' : ''}`} onClick={() => setActiveTab('assistant')}>
            <Bot size={18} /> Audit Assistant
          </div>
          <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <FileText size={18} /> Audit Reports
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="page-title">
            AI Internal Audit Assistant
          </div>

          <div className="topbar-actions" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              <Building2 size={16} color="var(--text-muted)" />
              North America Region
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              <Calendar size={16} color="var(--text-muted)" />
              Q2 2026 (Apr - Jun)
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>
            <div className="user-profile" style={{ cursor: 'pointer', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px', marginLeft: '8px' }}>
              <div className="avatar">JD</div>
              John Doe
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>
          </div>
        </div>

        {/* Content Render */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'upload' && renderUpload()}
        {activeTab === 'matching' && renderMatching()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'assistant' && renderAssistant()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'compliance' && renderCompliance()}

      </div>
    </div>
  );
}

export default App;
