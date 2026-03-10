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
  ArrowRight, Package, Receipt
} from 'lucide-react';

// --- MOCK DATA FOR DASHBOARD ---
const trendData = [
  { name: 'Jan', anomalies: 45, transactions: 12000 },
  { name: 'Feb', anomalies: 52, transactions: 11500 },
  { name: 'Mar', anomalies: 89, transactions: 14200 },
  { name: 'Apr', anomalies: 61, transactions: 13800 },
  { name: 'May', anomalies: 120, transactions: 15100 },
  { name: 'Jun', anomalies: 74, transactions: 12900 },
];

const riskDistData = [
  { name: 'High', value: 340, color: '#dc2626' },
  { name: 'Medium', value: 1250, color: '#f59e0b' },
  { name: 'Low', value: 8400, color: '#8cc63f' },
];

const duplicateData = [
  { x: 10, y: 30, z: 200 },
  { x: 20, y: 50, z: 260 },
  { x: 30, y: 70, z: 400 },
  { x: 40, y: 50, z: 280 },
  { x: 50, y: 90, z: 500 },
];

const heatmapData = [
  { name: 'V-012', compliance: 80, duplicates: 40, amtRisk: 90 },
  { name: 'V-045', compliance: 40, duplicates: 80, amtRisk: 50 },
  { name: 'V-088', compliance: 60, duplicates: 30, amtRisk: 70 },
  { name: 'V-102', compliance: 90, duplicates: 90, amtRisk: 100 },
];

const highRiskTransactions = [
  { id: 'INV-2026-9042', vendor: 'Nexus Consulting', amount: '$150,000', score: 98, reason: 'Unauthorized Vendor & No PO', action: 'Block Payment & Escalate' },
  { id: 'INV-2026-9081', vendor: 'TechGlobal Supplies', amount: '$45,000', score: 85, reason: 'Price Variance > 30%', action: 'Review Contract Terms' },
  { id: 'INV-2026-9114', vendor: 'Alpha Services Ltd', amount: '$12,500', score: 82, reason: 'Exact Duplicate (Inv Date/Amt)', action: 'Reject Duplicate' },
  { id: 'INV-2026-9205', vendor: 'Delta Logistics', amount: '$8,400', score: 76, reason: 'Weekend Entry & Missing GRN', action: 'Request GRN Verification' },
];

// --- MOCK DATA FOR INGESTION ---
const sampleDataPreview = [
  { id: 'TXN-90981', date: '2026-06-12', vendor: 'Omega Corp', poRef: 'PO-2026-88', total: '12,500.00', currency: 'USD', gst: 'Valid' },
  { id: 'TXN-90982', date: '2026-06-12', vendor: 'TechGlobal Supplies', poRef: 'PO-2026-89', total: '45,000.00', currency: 'USD', gst: 'Invalid Format' },
  { id: 'TXN-90983', date: '12/06/2026', vendor: 'alpha services ltd.', poRef: 'Missing', total: '12,500', currency: 'EUR', gst: 'Valid' },
  { id: 'TXN-90984', date: '2026-06-13', vendor: 'Office Needs Inc', poRef: 'PO-2026-91', total: '3,200.00', currency: 'USD', gst: 'Valid' },
  { id: 'TXN-90985', date: '14-Jun-26', vendor: 'Nexus Consulting', poRef: 'None', total: '150,000.00', currency: 'USD', gst: 'Missing' },
  { id: 'TXN-90986', date: '2026-06-14', vendor: 'Delta Logistics', poRef: 'PO-2026-93', total: '8,400.00', currency: 'USD', gst: 'Valid' },
  { id: 'TXN-90987', date: '2026-06-15', vendor: 'Spark Utilities', poRef: 'PO-2026-94', total: '1,150.00', currency: 'USD', gst: 'Valid' },
];

// --- MOCK DATA FOR MATCHING ---
const matchingResults = [
  { po: 'PO-2026-88', invoice: 'INV-90981', grn: 'GRN-5541', poQty: 100, recvQty: 100, billsQty: 100, status: 'Match' },
  { po: 'PO-2026-89', invoice: 'INV-90982', grn: 'GRN-5542', poQty: 500, recvQty: 400, billsQty: 500, status: 'Quantity Mismatch' },
  { po: 'PO-2026-90', invoice: 'INV-90985', grn: 'Missing', poQty: 200, recvQty: 0, billsQty: 200, status: 'Missing GRN' },
  { po: 'None', invoice: 'INV-90986', grn: 'GRN-5544', poQty: 0, recvQty: 50, billsQty: 50, status: 'Invoice Without PO' },
  { po: 'PO-2026-91', invoice: 'INV-90984', grn: 'GRN-5545', poQty: 50, recvQty: 50, billsQty: 50, status: 'Match' },
  { po: 'PO-2026-92', invoice: 'INV-90987', grn: 'GRN-5546', poQty: 1000, recvQty: 1000, billsQty: 1200, status: 'Quantity Mismatch' },
];

const matchingExceptions = [
  { vendor: 'TechGlobal Supplies', issue: 'Overbilling (Qty 100 Diff)', severity: 'High' },
  { vendor: 'Nexus Consulting', issue: 'Missing GRN for $150k Payment', severity: 'Critical' },
  { vendor: 'Delta Logistics', issue: 'Invoice Processed w/o PO', severity: 'High' },
  { vendor: 'Office Needs Inc', issue: 'Unit Price Variance (5%)', severity: 'Medium' },
];

function App() {
  const [activeTab, setActiveTab] = useState('matching'); // Default to matching

  const renderDashboard = () => (
    <div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Top KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Total Invoices Processed</div>
          <div className="kpi-value">42,840</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
          <div className="kpi-title">High Risk Transactions</div>
          <div className="kpi-value">340</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Duplicate Invoice Alerts</div>
          <div className="kpi-value">128</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Compliance Violations</div>
          <div className="kpi-value">845</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px' }}>
          <div className="kpi-title">Vendors Flagged</div>
          <div className="kpi-value">42</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="panels-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Vendor Risk Matrix</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={heatmapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={50} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="amtRisk" stackId="a" fill="#0076a8" />
                <Bar dataKey="compliance" stackId="a" fill="#8cc63f" />
                <Bar dataKey="duplicates" stackId="a" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Monthly Anomaly Trend</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="anomalies" stroke="var(--danger-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Risk Category Dist.</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={riskDistData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {riskDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel" style={{ padding: '20px' }}>
          <div className="panel-title" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Duplicate Clusters</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="x" name="Time" hide />
                <YAxis type="number" dataKey="y" name="Amount" hide />
                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Volume" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Duplicates" data={duplicateData} fill="var(--warning-color)" opacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Analytics Panels */}
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
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>342</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Flagged in last 30 days</div>
        </div>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--primary-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Approval Policy Violations</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>89</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Signatures missing or bypassed</div>
        </div>
        <div className="panel" style={{ padding: '20px', backgroundColor: '#fff', borderTop: '3px solid var(--accent-color)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '12px' }}>Weekend Financial Entries</div>
          <div style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>1,204</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Requires manual justification</div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="panel" style={{ padding: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
          <div className="panel-title" style={{ fontSize: '15px' }}>High Risk Transactions Table</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Risk Score</th>
              <th>Flag Reason</th>
              <th>Suggested Audit Action</th>
            </tr>
          </thead>
          <tbody>
            {highRiskTransactions.map((tx, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: 'var(--primary-color)' }}>{tx.id}</td>
                <td>{tx.vendor}</td>
                <td style={{ fontWeight: 500 }}>{tx.amount}</td>
                <td>
                  <div style={{ display: 'inline-block', backgroundColor: tx.score > 90 ? 'var(--danger-color)' : (tx.score > 80 ? 'var(--warning-color)' : 'var(--text-muted)'), color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                    {tx.score}
                  </div>
                </td>
                <td style={{ color: 'var(--danger-color)', fontSize: '13px' }}>{tx.reason}</td>
                <td style={{ fontSize: '13px', fontWeight: 500 }}>{tx.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>

      {/* Status Indicators */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary-color)' }}>
          <div className="kpi-title">Records Uploaded</div>
          <div className="kpi-value">128,450</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}>
          <div className="kpi-title">Records Standardized</div>
          <div className="kpi-value">128,211</div>
        </div>
        <div className="kpi-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
          <div className="kpi-title">Errors Detected</div>
          <div className="kpi-value">239</div>
        </div>
      </div>

      {/* Upload Panel */}
      <div className="panel" style={{ marginBottom: '24px', padding: '24px' }}>
        <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '20px' }}>
          <div className="panel-title" style={{ fontSize: '15px' }}>GenW AppMaker Data Connectors</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>

          {[
            { title: "Invoice Data", icon: <FileSpreadsheet size={24} color="var(--primary-color)" /> },
            { title: "Purchase Orders", icon: <FileSpreadsheet size={24} color="var(--primary-color)" /> },
            { title: "GRN Files", icon: <FileSpreadsheet size={24} color="var(--primary-color)" /> },
            { title: "Vendor Master", icon: <FileSpreadsheet size={24} color="var(--primary-color)" /> },
            { title: "Approval Logs", icon: <FileSpreadsheet size={24} color="var(--primary-color)" /> }
          ].map((item, i) => (
            <div key={i} style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '24px 16px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer', transition: 'border-color 0.2s', hover: { borderColor: 'var(--accent-color)' } }}>
              <div style={{ marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>CSV, Excel, ERP export</div>
              <button style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, color: 'var(--text-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}>
                <CloudUploadIcon /> Browse
              </button>
            </div>
          ))}

        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
        {/* Data Preview Table */}
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
            <div className="panel-title" style={{ fontSize: '15px' }}>Data Preview (Latest Invoice Data)</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Showing 10 records</div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Vendor</th>
                <th>PO Ref</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>GST Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleDataPreview.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: 'var(--primary-color)' }}>{row.id}</td>
                  <td style={{ fontSize: '13px' }}>{row.date}</td>
                  <td style={{ fontSize: '13px' }}>{row.vendor}</td>
                  <td style={{ fontSize: '13px' }}>{row.poRef}</td>
                  <td style={{ fontSize: '13px', fontWeight: 500 }}>{row.total}</td>
                  <td style={{ fontSize: '13px' }}>{row.currency}</td>
                  <td>
                    {row.gst === 'Valid' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--secondary-color)', fontSize: '12px' }}><CheckCircle size={14} /> Valid</span>
                    ) : row.gst === 'Missing' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--danger-color)', fontSize: '12px' }}><XCircle size={14} /> Missing</span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--warning-color)', fontSize: '12px' }}><AlertTriangle size={14} /> Invalid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Data Standardization Panel */}
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
            <div className="panel-title" style={{ fontSize: '15px' }}>Data Standardization Pipeline</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ color: 'var(--secondary-color)', marginTop: '2px' }}><CheckCircle size={18} /></div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Vendor Name Normalization</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Unified 34 variations of "TechGlobal" into standard vendor ID V-088.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMatching = () => (
    <div className="dashboard-content" style={{ backgroundColor: 'var(--bg-color)' }}>

      {/* Top Section - Overview & Flow Diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>

        {/* Metrics Grid */}
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="kpi-title">Transactions Checked</div>
            <div className="kpi-value" style={{ fontSize: '32px' }}>42,840</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--secondary-color)' }}>
              <div className="kpi-title">Matching Transactions</div>
              <div className="kpi-value" style={{ fontSize: '24px' }}>38,120</div>
            </div>
            <div className="panel" style={{ padding: '20px', borderLeft: '4px solid var(--danger-color)' }}>
              <div className="kpi-title">Mismatched Records</div>
              <div className="kpi-value" style={{ fontSize: '24px' }}>4,720</div>
            </div>
          </div>
        </div>

        {/* Visual Flow Overview */}
        <div className="panel" style={{ gridColumn: 'span 3', padding: '32px 24px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '24px', color: 'var(--text-dark)' }}>GenW AppMaker Three-Way Matching Pipeline</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <FileText size={28} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Purchase Order</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Approved Order Intent</div>
            </div>

            <div style={{ color: 'var(--accent-color)', opacity: 0.5 }}><ArrowRight size={32} /></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <Package size={28} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Goods Receipt Node</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Physical Deliverables Log</div>
            </div>

            <div style={{ color: 'var(--accent-color)', opacity: 0.5 }}><ArrowRight size={32} /></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <Receipt size={28} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Vendor Invoice</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Final Billing Execution</div>
            </div>

          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '75% 25%', gap: '24px' }}>

        {/* Matching Results Table */}
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
            <div className="panel-title" style={{ fontSize: '15px' }}>Matching Results / Variance Detection</div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Invoice Number</th>
                <th>GRN Ref</th>
                <th style={{ textAlign: 'right' }}>PO Qty</th>
                <th style={{ textAlign: 'right' }}>Recv Qty</th>
                <th style={{ textAlign: 'right' }}>Billed Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {matchingResults.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontSize: '13px', color: row.po === 'None' ? 'var(--danger-color)' : 'var(--text-dark)' }}>{row.po}</td>
                  <td style={{ fontSize: '13px', fontWeight: 500 }}>{row.invoice}</td>
                  <td style={{ fontSize: '13px', color: row.grn === 'Missing' ? 'var(--danger-color)' : 'var(--text-dark)' }}>{row.grn}</td>
                  <td style={{ fontSize: '13px', textAlign: 'right' }}>{row.poQty}</td>
                  <td style={{ fontSize: '13px', textAlign: 'right' }}>{row.recvQty}</td>
                  <td style={{ fontSize: '13px', textAlign: 'right' }}>{row.billsQty}</td>
                  <td>
                    {row.status === 'Match' ? (
                      <span className="status-badge status-low"><CheckCircle size={12} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> Match</span>
                    ) : row.status === 'Quantity Mismatch' ? (
                      <span className="status-badge status-medium"><AlertTriangle size={12} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> {row.status}</span>
                    ) : (
                      <span className="status-badge status-high"><XCircle size={12} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> {row.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Panel: Top Exceptions */}
        <div className="panel" style={{ padding: '24px' }}>
          <div className="panel-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
            <div className="panel-title" style={{ fontSize: '15px' }}>Top Discrepancy Themes</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {matchingExceptions.map((exc, i) => (
              <div key={i} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{exc.vendor}</div>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase',
                    backgroundColor: exc.severity === 'Critical' ? '#fee2e2' : exc.severity === 'High' ? '#ffedd5' : '#fef9c3',
                    color: exc.severity === 'Critical' ? '#991b1b' : exc.severity === 'High' ? '#c2410c' : '#854d0e'
                  }}>{exc.severity}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exc.issue}</div>
              </div>
            ))}
          </div>
        </div>

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

      </div>
    </div>
  );
}

// Custom internal component to avoid missing import
const CloudUploadIcon = () => <UploadCloud size={14} color="var(--text-dark)" style={{ marginRight: '4px' }} />;

export default App;
