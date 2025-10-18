import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + '.jpg');
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Stockage en mémoire
let photoSeries = [];

// ========== API ROUTES ==========

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Photobooth API running',
    series: photoSeries.length
  });
});

app.post('/api/upload', upload.array('photos', 3), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Aucune photo reçue' 
      });
    }

    const newSeries = {
      id: Date.now().toString(),
      photos: req.files.map(file => `/uploads/${file.filename}`),
      timestamp: new Date().toISOString(),
      count: req.files.length
    };

    photoSeries.unshift(newSeries);
    
    // Garder seulement 50 séries
    if (photoSeries.length > 50) {
      const oldSeries = photoSeries.slice(50);
      oldSeries.forEach(series => {
        series.photos.forEach(photoPath => {
          const filename = path.join(__dirname, photoPath);
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
        });
      });
      photoSeries = photoSeries.slice(0, 50);
    }

    console.log('✅ Série ajoutée:', newSeries.id);
    res.json({ success: true, series: newSeries });
    
  } catch (error) {
    console.error('❌ Erreur upload:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      error: error.message 
    });
  }
});

app.get('/api/series', (req, res) => {
  res.json({ 
    success: true, 
    series: photoSeries,
    count: photoSeries.length
  });
});

app.delete('/api/series/:id', (req, res) => {
  const seriesIndex = photoSeries.findIndex(s => s.id === req.params.id);
  
  if (seriesIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Série non trouvée' 
    });
  }
  
  // Supprimer les fichiers
  photoSeries[seriesIndex].photos.forEach(photoPath => {
    const filename = path.join(__dirname, photoPath);
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
  });
  
  photoSeries.splice(seriesIndex, 1);
  res.json({ success: true, message: 'Série supprimée' });
});

// Page principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Page admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Démarrage
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 ========================================');
  console.log('🚀 Photobooth démarré !');
  console.log('========================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log('========================================\n');
});