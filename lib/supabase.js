import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ Advertencia: SUPABASE_URL o SUPABASE_SERVICE_KEY no están definidas en el entorno.');
}

// Usamos la service_role key para poder saltarnos las políticas RLS desde el servidor
// y gestionar los archivos de forma administrativa.
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
