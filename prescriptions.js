const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// Send prescription
router.post('/', auth, async (req, res) => {
  const { appointmentId, patientId, medicines, notes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, medicines, notes) VALUES (?,?,?,?,?)',
      [appointmentId, patientId, req.doctor.id, JSON.stringify(medicines), notes]
    );
    res.json({ msg: 'Prescription saved', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
