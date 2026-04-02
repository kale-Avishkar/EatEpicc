import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://etmamuxpakusealdpube.supabase.co'
const supabaseKey = 'sb_publishable_FcuOinpwE2jf8ctBI5DzMQ_YGnRPzx0'

export const supabase = createClient(supabaseUrl, supabaseKey)
