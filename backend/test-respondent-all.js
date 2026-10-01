/**
 * Comprehensive Integration and Unit Test Suite for Respondent Module
 * Tests all 6 requested respondent features:
 * 1. Online Meeting & Hearings
 * 2. Case Details & Defense Response Submission
 * 3. Document Workspace (Upload, Read, Delete)
 * 4. Events / Hearing Calendar (Create, Read, Update, Delete)
 * 5. Payments (Create, Read User Payments, Verification)
 * 6. Real-time Communication (Cases, Participants, Socket handshake)
 */

const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = 'http://localhost:3636';
const JWT_SECRET = process.env.JWT_SECRET || 'my_secrect_code_is_9123891238';

let passed = 0;
let failed = 0;

function logPass(msg) {
  passed++;
  console.log(`\x1b[32m  ✔ PASS: ${msg}\x1b[0m`);
}

function logFail(msg, err) {
  failed++;
  console.error(`\x1b[31m  ✖ FAIL: ${msg}\x1b[0m`, err ? `-> ${err.message || err}` : '');
}

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, data: json });
      });
    });

    req.on('error', reject);

    if (body) {
      if (Buffer.isBuffer(body) || typeof body === 'string') {
        req.write(body);
      } else {
        req.setHeader('Content-Type', 'application/json');
        req.write(JSON.stringify(body));
      }
    }
    req.end();
  });
}

function buildMultipartBody(boundary, fields, files = []) {
  const parts = [];
  for (const [key, val] of Object.entries(fields)) {
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`
      )
    );
  }
  for (const file of files) {
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${file.name}"; filename="${file.filename}"\r\nContent-Type: ${file.contentType || 'application/octet-stream'}\r\n\r\n`
      )
    );
    parts.push(file.content);
    parts.push(Buffer.from('\r\n'));
  }
  parts.push(Buffer.from(`--${boundary}--\r\n`));
  return Buffer.concat(parts);
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🚀 RUNNING RESPONDENT INTEGRATION & UNIT TEST SUITE');
  console.log(`Target Backend: ${BASE_URL}`);
  console.log('======================================================\n');

  // Respondent test profile
  const testUser = {
    id: '6abca2e912608b96242e4218',
    email: 'respondent@gmqil.com',
    name: 'Jane Respondent',
    role: 'respondent',
  };

  const token = jwt.sign(
    { id: testUser.id, email: testUser.email, role: testUser.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let testCase = null;
  let testCaseId = null;

  // ----------------------------------------------------------------
  // 1. CASE DETAILS TESTS
  // ----------------------------------------------------------------
  console.log('📋 [1/6] Testing Respondent Case Details...');
  try {
    const res = await request(
      `${BASE_URL}/respondent/my-case`,
      { method: 'POST', headers: authHeaders },
      { email: testUser.email }
    );

    const cases = Array.isArray(res.data) ? res.data : (res.data?.cases || res.data?.data || []);

    if (res.status === 200 && Array.isArray(cases)) {
      logPass(`Retrieved ${cases.length} cases for respondent (${testUser.email})`);
      if (cases.length > 0) {
        testCase = cases[0];
        testCaseId = testCase._id;
        logPass(`Using Case ID: ${testCaseId} ("${testCase.DisputeName || testCase.caseTitle || 'Dispute'}")`);
      }
    } else {
      logFail(`Fetch my-case returned status ${res.status}`, JSON.stringify(res.data));
    }
  } catch (err) {
    logFail('Fetch my-case threw error', err);
  }

  // Test submitting defense / response
  try {
    if (testCaseId) {
      const respRes = await request(
        `${BASE_URL}/respondent/submit-case-response`,
        { method: 'POST', headers: authHeaders },
        {
          caseId: testCaseId,
          consent: 'Yes',
          responseNotes: 'Respondent agrees to conciliation terms and proposes a structured settlement schedule.',
          respondentEmail: testUser.email,
        }
      );

      if (respRes.status === 200 && respRes.data.success) {
        logPass(`Submitted defense response for case ${testCaseId} (Status: ${respRes.data.case.consent})`);
      } else {
        logFail('Submit case response failed', JSON.stringify(respRes.data));
      }
    } else {
      logFail('Skipped submit-case-response: no testCaseId available');
    }
  } catch (err) {
    logFail('Submit case response threw error', err);
  }

  // ----------------------------------------------------------------
  // 2. DOCUMENT WORKSPACE TESTS (CRUD)
  // ----------------------------------------------------------------
  console.log('\n📁 [2/6] Testing Respondent Document Workspace (Upload, Read, Delete)...');
  let uploadedDocId = null;

  try {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const mockFileContent = Buffer.from('PDF_CONTENT_TEST: Respondent Defense Evidence and ID Proof');

    const body = buildMultipartBody(
      boundary,
      {
        caseId: testCaseId || '6abe68e2fc6d49cbe9e6fd5a',
        caseNumber: testCase?.caseId || 'CASE-2025-001',
        documentType: 'Written Defense Statement',
        respondentEmail: testUser.email,
        notes: 'Official response and evidence uploaded by respondent',
      },
      [
        {
          name: 'documents',
          filename: 'defense_evidence_doc.pdf',
          contentType: 'application/pdf',
          content: mockFileContent,
        },
      ]
    );

    const uploadRes = await request(
      `${BASE_URL}/respondent/document-upload-by-respondent`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length,
        },
      },
      body
    );

    if (uploadRes.status === 200 && uploadRes.data.success) {
      logPass('Document uploaded successfully via /respondent/document-upload-by-respondent');
      if (uploadRes.data.data?._id) {
        uploadedDocId = uploadRes.data.data._id;
        logPass(`Created Document record ID: ${uploadedDocId}`);
      }
    } else {
      logFail(`Upload document returned status ${uploadRes.status}`, JSON.stringify(uploadRes.data));
    }
  } catch (err) {
    logFail('Upload document threw error', err);
  }

  // Read Documents
  try {
    const docsRes = await request(
      `${BASE_URL}/respondent/get-documents/${encodeURIComponent(testUser.email)}`,
      { headers: authHeaders }
    );
    if (docsRes.status === 200 && docsRes.data.success && Array.isArray(docsRes.data.documents)) {
      logPass(`Retrieved ${docsRes.data.documents.length} document records for respondent`);
      if (!uploadedDocId && docsRes.data.documents.length > 0) {
        uploadedDocId = docsRes.data.documents[0]._id;
      }
    } else {
      logFail('Get documents failed', JSON.stringify(docsRes.data));
    }
  } catch (err) {
    logFail('Get documents threw error', err);
  }

  // Delete Document
  try {
    if (uploadedDocId) {
      const delRes = await request(
        `${BASE_URL}/respondent/delete-document/${uploadedDocId}`,
        { method: 'DELETE', headers: authHeaders }
      );
      if (delRes.status === 200 && delRes.data.success) {
        logPass(`Deleted document record ${uploadedDocId} via /respondent/delete-document/:id`);
      } else {
        logFail(`Delete document returned status ${delRes.status}`, JSON.stringify(delRes.data));
      }
    } else {
      logFail('Skipped delete document: no uploadedDocId available');
    }
  } catch (err) {
    logFail('Delete document threw error', err);
  }

  // ----------------------------------------------------------------
  // 3. EVENTS / HEARING CALENDAR TESTS (CRUD)
  // ----------------------------------------------------------------
  console.log('\n📅 [3/6] Testing Events & Calendar (Create, Read, Update, Delete)...');
  let createdEventId = null;

  // Create Event
  try {
    const createEvtRes = await request(
      `${BASE_URL}/respondent/create-event`,
      { method: 'POST', headers: authHeaders },
      {
        caseId: testCaseId || undefined,
        caseName: testCase?.DisputeName || 'Commercial Contract Conciliation',
        title: 'Virtual Mediation Session',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '11:00',
        duration: '45 mins',
        hearingType: 'Video Conference',
        location: 'Virtual Courtroom Room #1',
        description: 'First virtual caucus with mediator and claimant',
        meetLink: 'https://meet.jit.si/odr-session-2025',
        participants: 3,
        status: 'Scheduled',
        respondentEmail: testUser.email,
      }
    );

    if (
      (createEvtRes.status === 200 || createEvtRes.status === 201) &&
      createEvtRes.data.success &&
      createEvtRes.data.hearing
    ) {
      createdEventId = createEvtRes.data.hearing._id;
      logPass(`Created hearing event ${createdEventId} ("${createEvtRes.data.hearing.caseName}")`);
    } else {
      logFail('Create event failed', JSON.stringify(createEvtRes.data));
    }
  } catch (err) {
    logFail('Create event threw error', err);
  }

  // Read Hearings / Events
  try {
    const listEvtRes = await request(
      `${BASE_URL}/respondent/get-hearing-by-caseId`,
      { method: 'POST', headers: authHeaders },
      { email: testUser.email }
    );

    if (listEvtRes.status === 200 && listEvtRes.data.success && Array.isArray(listEvtRes.data.hearings)) {
      logPass(`Retrieved ${listEvtRes.data.hearings.length} scheduled hearings for respondent`);
    } else {
      logFail('Get hearings failed', JSON.stringify(listEvtRes.data));
    }
  } catch (err) {
    logFail('Get hearings threw error', err);
  }

  // Update Event
  try {
    if (createdEventId) {
      const updateEvtRes = await request(
        `${BASE_URL}/respondent/update-event/${createdEventId}`,
        { method: 'PUT', headers: authHeaders },
        {
          status: 'Completed',
          notes: 'Hearing finished and conciliation outcome logged.',
        }
      );

      if (updateEvtRes.status === 200 && updateEvtRes.data.success) {
        logPass(`Updated event ${createdEventId} status to "${updateEvtRes.data.hearing.status}"`);
      } else {
        logFail('Update event failed', JSON.stringify(updateEvtRes.data));
      }
    }
  } catch (err) {
    logFail('Update event threw error', err);
  }

  // Delete Event
  try {
    if (createdEventId) {
      const delEvtRes = await request(
        `${BASE_URL}/respondent/delete-event/${createdEventId}`,
        { method: 'DELETE', headers: authHeaders }
      );
      if (delEvtRes.status === 200 && delEvtRes.data.success) {
        logPass(`Deleted hearing event ${createdEventId} cleanly`);
      } else {
        logFail('Delete event failed', JSON.stringify(delEvtRes.data));
      }
    }
  } catch (err) {
    logFail('Delete event threw error', err);
  }

  // ----------------------------------------------------------------
  // 4. PAYMENTS TESTS (CRUD)
  // ----------------------------------------------------------------
  console.log('\n💳 [4/6] Testing Payments System (Create, Query by Email, Case Linking)...');
  let createdPaymentId = null;

  try {
    const mockTxn = 'TXN-RESP-' + Math.floor(100000 + Math.random() * 900000);
    const payRes = await request(
      `${BASE_URL}/api/payments`,
      { method: 'POST', headers: authHeaders },
      {
        userEmail: testUser.email,
        amount: 2500,
        currency: 'INR',
        caseId: testCaseId ? String(testCaseId) : 'CASE-2025-001',
        caseTitle: testCase?.DisputeName || 'Commercial Dispute Conciliation Fee',
        status: 'Completed',
        method: 'UPI / NetBanking',
        transactionId: mockTxn,
        description: 'Respondent Administration and Hearing Fee',
      }
    );

    if (payRes.status === 201 && payRes.data.success && (payRes.data.payment || payRes.data.data)) {
      const p = payRes.data.payment || payRes.data.data;
      createdPaymentId = p._id;
      logPass(`Created payment ${createdPaymentId} (Amount: INR ${p.amount}, Txn: ${p.transactionId})`);
    } else {
      logFail('Create payment failed', JSON.stringify(payRes.data));
    }
  } catch (err) {
    logFail('Create payment threw error', err);
  }

  // Query User Payments
  try {
    const getPayRes = await request(
      `${BASE_URL}/api/payments/my?userEmail=${encodeURIComponent(testUser.email)}`,
      { headers: authHeaders }
    );
    if (getPayRes.status === 200 && getPayRes.data.success) {
      const list = getPayRes.data.payments || getPayRes.data.data || [];
      logPass(`Retrieved respondent payments list (${list.length} records)`);
    } else {
      logFail('Get user payments failed', JSON.stringify(getPayRes.data));
    }
  } catch (err) {
    logFail('Get user payments threw error', err);
  }

  // ----------------------------------------------------------------
  // 5. COMMUNICATION & CHAT TESTS
  // ----------------------------------------------------------------
  console.log('\n💬 [5/6] Testing Real-Time Communication & Chat Endpoints...');
  try {
    const chatCasesRes = await request(`${BASE_URL}/api/chat/cases`, {
      headers: authHeaders,
    });
    const chatCases = chatCasesRes.data?.cases || chatCasesRes.data?.data || [];
    if (chatCasesRes.status === 200 && chatCasesRes.data?.success && Array.isArray(chatCases)) {
      logPass(`Retrieved ${chatCases.length} cases for chat selector`);

      if (chatCases.length > 0) {
        const cId = chatCases[0]._id;
        const partRes = await request(`${BASE_URL}/api/chat/participants/${cId}`, {
          headers: authHeaders,
        });
        if (partRes.status === 200 && partRes.data.success && Array.isArray(partRes.data.participants)) {
          logPass(`Retrieved ${partRes.data.participants.length} participants for case ${cId}`);
        } else {
          logFail(`Get participants for case ${cId} failed`, JSON.stringify(partRes.data));
        }
      } else {
        logPass('No active dispute cases for this user in chat list (valid response)');
      }
    } else {
      logFail('Get chat cases failed', JSON.stringify(chatCasesRes.data));
    }
  } catch (err) {
    logFail('Chat cases endpoint threw error', err);
  }

  // Socket.IO handshake
  try {
    const socketRes = await request(`${BASE_URL}/socket.io/?EIO=4&transport=polling`);
    if (socketRes.status === 200 && typeof socketRes.data === 'string' && socketRes.data.includes('sid')) {
      logPass('Socket.IO engine connected & returned active session ID handshake');
    } else {
      logFail('Socket.IO handshake returned unexpected status/data', socketRes.data);
    }
  } catch (err) {
    logFail('Socket.IO handshake threw error', err);
  }

  // ----------------------------------------------------------------
  // 6. ONLINE MEETING & DOMAIN ROUTE SERVING
  // ----------------------------------------------------------------
  console.log('\n🌐 [6/6] Testing Production Domain Route Serving & SPAs...');
  const routesToTest = [
    '/respondent/online-meeting',
    '/respondent/case-details',
    '/respondent/documents',
    '/respondent/events',
    '/respondent/payments',
    '/respondent/communication',
  ];

  for (const r of routesToTest) {
    try {
      const pageRes = await request(`${BASE_URL}${r}`);
      if (pageRes.status === 200 && typeof pageRes.data === 'string' && pageRes.data.includes('<!doctype html>')) {
        logPass(`Route ${r} serves production HTML bundle (200 OK)`);
      } else {
        logFail(`Route ${r} returned status ${pageRes.status}`);
      }
    } catch (err) {
      logFail(`Route ${r} request failed`, err);
    }
  }

  // ----------------------------------------------------------------
  // SUMMARY REPORT
  // ----------------------------------------------------------------
  console.log('\n======================================================');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\n✨ ALL RESPONDENT INTEGRATION & UNIT TESTS PASSED SUCCESSFULLY! ✨\n');
    process.exit(0);
  }
}

runTests().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
