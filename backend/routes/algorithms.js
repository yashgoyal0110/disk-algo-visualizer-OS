const express = require('express');
const router = express.Router();
const algorithms = require('../services/algorithms');

// Input validation middleware
const validateInput = (req, res, next) => {
  const { sequence, head, direction } = req.body;
  
  if (!sequence || !Array.isArray(sequence) || sequence.length === 0) {
    return res.status(400).json({ error: 'Invalid request sequence' });
  }
  
  if (head === undefined || head === null || !Number.isInteger(head) || head < 0) {
    return res.status(400).json({ error: 'Invalid head position' });
  }
  
  // Convert all sequence values to integers
  req.body.sequence = sequence.map(n => parseInt(n, 10));
  req.body.head = parseInt(head, 10);
  
  if (!algorithms.isValidInputNumbers(req.body.sequence, req.body.head)) {
    return res.status(400).json({ 
      error: 'Values must be in range 0-199' 
    });
  }
  
  next();
};

// FCFS endpoint
router.post('/fcfs', validateInput, (req, res) => {
  try {
    const { sequence, head } = req.body;
    const result = algorithms.fcfs([...sequence], head);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SSTF endpoint
router.post('/sstf', validateInput, (req, res) => {
  try {
    const { sequence, head } = req.body;
    const result = algorithms.sstf([...sequence], head);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SCAN endpoint
router.post('/scan', validateInput, (req, res) => {
  try {
    const { sequence, head, direction = 'Right' } = req.body;
    const result = algorithms.scan([...sequence], head, direction);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// C-SCAN endpoint
router.post('/cscan', validateInput, (req, res) => {
  try {
    const { sequence, head, direction = 'Right' } = req.body;
    const result = algorithms.cscan([...sequence], head, direction);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOOK endpoint
router.post('/look', validateInput, (req, res) => {
  try {
    const { sequence, head, direction = 'Right' } = req.body;
    const result = algorithms.look([...sequence], head, direction);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// C-LOOK endpoint
router.post('/clook', validateInput, (req, res) => {
  try {
    const { sequence, head, direction = 'Right' } = req.body;
    const result = algorithms.clook([...sequence], head, direction);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Compare all algorithms endpoint
router.post('/compare', validateInput, (req, res) => {
  try {
    const { sequence, head, direction = 'Right' } = req.body;
    const result = algorithms.compareAll([...sequence], head, direction);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
