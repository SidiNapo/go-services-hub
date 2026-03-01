

## GoFix: Photo + Message 100% Automatique

### Le probleme actuel
Le lien `wa.me` ne peut PAS joindre d'image - il ne fait que pre-remplir du texte. La photo se perd a chaque fois.

### La solution creative
Puisque vous voulez du 100% automatique cote serveur, voici l'architecture:

1. **Activer Lovable Cloud (Supabase)** pour avoir un backend
2. **Creer un bucket de stockage** `gofix-photos` (public) pour heberger les photos
3. **Creer une edge function** `send-gofix-request` qui recoit la photo + les infos du formulaire, stocke la photo, et enregistre la demande en base
4. **Modifier GoFixPage** pour envoyer tout au serveur, puis rediriger vers WhatsApp avec un lien direct vers la photo dans le message

### Comment ca marche pour le client

```text
Client remplit le formulaire + photo
         |
         v
Clic "Confirmer via WhatsApp"
         |
         v
Photo uploadee sur le cloud (URL permanente)
         |
         v
WhatsApp s'ouvre avec le message + lien image cliquable
         |
         v
Le business recoit: texte propre + lien vers la photo (visible et permanente)
```

L'image ne sera PLUS jamais perdue car elle est stockee sur le cloud avec une URL permanente incluse dans le message.

### Etapes techniques

**Etape 1: Activer Lovable Cloud**
- Initialiser la connexion Supabase via Lovable Cloud

**Etape 2: Migration SQL**
- Creer le bucket `gofix-photos` (public, lecture sans auth)
- Creer la table `gofix_requests` pour historiser les demandes (type, description, ville, adresse, date, heure, nom, tel, photo_url, created_at)
- Policies RLS: insert anonyme, select restreint

**Etape 3: Edge function `send-gofix-request`**
- Recoit le formulaire en multipart (photo + champs)
- Upload la photo dans le bucket `gofix-photos`
- Insere la demande dans `gofix_requests`
- Retourne l'URL publique de la photo

**Etape 4: Modifier `src/pages/GoFixPage.tsx`**
- Remplacer le download hack par un appel a l'edge function
- Recuperer l'URL de la photo uploadee
- Construire le message WhatsApp avec le lien de la photo integre:
  ```
  Demande d'intervention GoFix
  ---
  Type: Plomberie
  Probleme: Fuite sous evier
  Ville: Casablanca
  ...
  Photo: https://[supabase-url]/storage/v1/object/public/gofix-photos/abc123.jpg
  ```
- Ouvrir `wa.me` avec ce message - le lien est cliquable et l'image est visible
- Afficher un toast de confirmation propre
- Garder le bouton avec etat loading pendant l'upload

**Etape 5: Creer `src/integrations/supabase/`**
- Client Supabase configure avec les variables d'environnement

### Resultat final
- Le client clique "Confirmer" et est redirige vers WhatsApp
- Le message contient un lien direct vers la photo hebergee dans le cloud
- La photo est TOUJOURS accessible (pas de telechargement local, pas de fichier perdu)
- Toutes les demandes sont aussi sauvegardees en base pour suivi

### Fichiers a creer/modifier
- `supabase/migrations/001_gofix_storage.sql` (bucket + table + RLS)
- `supabase/functions/send-gofix-request/index.ts` (edge function)
- `src/integrations/supabase/client.ts` (client Supabase)
- `src/pages/GoFixPage.tsx` (nouveau flow d'envoi)

### Note importante
Pour un envoi WhatsApp 100% automatique SANS que le client ouvre WhatsApp, il faudrait des credentials WhatsApp Business API (Meta Business). Cette solution intermediaire garantit que la photo arrive toujours via un lien cloud permanent, ce qui resout definitivement le probleme d'image perdue.
