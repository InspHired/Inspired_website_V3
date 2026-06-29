const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.SUPABASE_URL);
    
    try {
        // Try to get content
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .limit(5);
        
        if (error) {
            console.log('❌ Error:', error.message);
            console.log('Details:', error);
        } else {
            console.log('✅ Success! Found', data.length, 'rows');
            console.log('Sample data:', data[0]);
        }
    } catch (err) {
        console.log('❌ Exception:', err.message);
    }
}

testConnection();