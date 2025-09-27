router.post('/register', async (req, res) => {
  const { name, email, password, phone, dob } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM patients WHERE email=?', [email]);
    if (rows.length) return res.status(400).json({ msg: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO patients (name, email, phone, dob, password_hash) VALUES (?,?,?,?,?)',
      [name, email, phone, dob, hash]
    );

    res.json({ msg: 'Patient registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
