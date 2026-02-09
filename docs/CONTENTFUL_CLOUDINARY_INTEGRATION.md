# Intégration Cloudinary + Contentful

Ce guide explique comment utiliser l'intégration Cloudinary dans Contentful pour gérer et afficher vos images.

## 📋 Prérequis

- Compte Cloudinary actif
- Compte Contentful actif
- Variables d'environnement configurées dans `.env`

## 🔧 Configuration

### 1. Installer l'app Cloudinary dans Contentful

1. Dans Contentful, allez dans **Settings** → **Apps** → **Marketplace**
2. Recherchez "Cloudinary" et cliquez sur **Install**
3. Entrez vos credentials Cloudinary:
   - Cloud Name: `dutmoo68s`
   - API Key: `684641657623276`
   - API Secret: (depuis votre fichier .env)

### 2. Créer un Content Type avec champ Cloudinary

1. Allez dans **Content model** → **Add content type**
2. Créez un nouveau type (exemple: "Media Asset")
3. Ajoutez les champs suivants:
   - **Title** (Short text, required)
   - **Description** (Long text, optional)
   - **Cloudinary Image** (JSON object)
     - Dans l'onglet **Appearance**, sélectionnez **Cloudinary**

### 3. Structure du Content Type recommandée

```typescript
{
  "name": "Media Asset",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "description",
      "name": "Description",
      "type": "Text"
    },
    {
      "id": "cloudinaryImage",
      "name": "Cloudinary Image",
      "type": "Object"
    },
    {
      "id": "category",
      "name": "Category",
      "type": "Symbol"
    },
    {
      "id": "tags",
      "name": "Tags",
      "type": "Array",
      "items": { "type": "Symbol" }
    }
  ]
}
```

## 📝 Utilisation

### Ajouter une image dans Contentful

1. Créez une nouvelle entrée de votre Content Type
2. Dans le champ Cloudinary, cliquez sur **Select or upload image**
3. L'interface Cloudinary s'ouvre:
   - Uploadez une nouvelle image
   - Ou sélectionnez une image existante dans votre Media Library
4. Cliquez sur **Insert**
5. Publiez votre entrée

### Récupérer les images dans votre code

#### Exemple 1: Liste simple

\`\`\`typescript
import { getContentfulEntriesWithCloudinary } from '@/lib/contentful/cloudinary'

const entries = await getContentfulEntriesWithCloudinary('mediaAsset', 10)
\`\`\`

#### Exemple 2: Avec CldImage

\`\`\`tsx
import { CldImage } from 'next-cloudinary'
import { extractCloudinaryPublicId } from '@/lib/contentful/cloudinary'

const publicId = extractCloudinaryPublicId(entry.fields.cloudinaryImage)

<CldImage
  src={publicId}
  width={800}
  height={600}
  crop="fill"
  gravity="auto"
  alt="Image description"
/>
\`\`\`

#### Exemple 3: Avec transformations personnalisées

\`\`\`tsx
import { buildCloudinaryUrl } from '@/lib/contentful/cloudinary'

const url = buildCloudinaryUrl(
  entry.fields.cloudinaryImage,
  'w_400,h_300,c_fill,g_face,q_auto,f_auto'
)
\`\`\`

## 🎨 Transformations Cloudinary disponibles

### Transformations communes

- **Crop & Resize**: `c_fill,w_800,h_600`
- **Auto Gravity**: `g_auto` ou `g_face`
- **Quality Auto**: `q_auto`
- **Format Auto**: `f_auto`
- **Background Removal**: `e_background_removal`
- **AI Enhancement**: `e_enhance`
- **Filters**: `e_grayscale`, `e_sepia`, `e_blur:300`

### Exemples de combinaisons

\`\`\`typescript
// Image carrée avec détection de visage
'w_500,h_500,c_fill,g_face,q_auto,f_auto'

// Image responsive avec amélioration AI
'w_1200,c_scale,q_auto,f_auto,e_enhance'

// Thumbnail avec coins arrondis
'w_200,h_200,c_fill,r_20,q_auto,f_auto'

// Image avec fond retiré
'w_800,h_600,c_pad,b_white,e_background_removal'
\`\`\`

## 🚀 Page de démonstration

Une page de démonstration est disponible à `/contentful-gallery` qui affiche toutes les images de votre Content Type.

Pour l'utiliser:

1. Créez des entrées dans Contentful avec des images Cloudinary
2. Visitez `http://localhost:3001/contentful-gallery`
3. Les images s'afficheront automatiquement

## 🔍 Debugging

### Vérifier la structure des données

\`\`\`typescript
// Log la structure complète d'une entrée
const entry = await getContentfulEntry('ENTRY_ID')
console.log('Entry structure:', JSON.stringify(entry, null, 2))
\`\`\`

### Problèmes courants

1. **Pas d'images affichées**
   - Vérifiez que le Content Type ID correspond
   - Vérifiez que les entrées sont publiées dans Contentful
   - Vérifiez que le champ Cloudinary contient bien des données

2. **Images ne se chargent pas**
   - Vérifiez votre Cloud Name dans `.env`
   - Vérifiez les public_ids dans la console

3. **Erreur de permissions**
   - Vérifiez votre Access Token Contentful
   - Assurez-vous que l'environment est correct

## 📚 Resources

- [Documentation Cloudinary](https://cloudinary.com/documentation)
- [Documentation Contentful](https://www.contentful.com/developers/docs/)
- [App Cloudinary pour Contentful](https://www.contentful.com/marketplace/app/cloudinary/)
- [Next Cloudinary](https://next.cloudinary.dev/)
