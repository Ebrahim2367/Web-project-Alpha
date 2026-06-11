const SUPABASE_URL = 'https://eubzymhdjjgvhakswuki.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Ynp5bWhkampndmhha3N3dWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzgyMDAsImV4cCI6MjA5Njc1NDIwMH0.2U9JRh0u_xxSFq9unQdm_YwqiAipNbYMkpeyOz3u0_k';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const form = document.getElementById('accountForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const { data, error } = await supabaseClient
        .from('users') 
        .insert([
            { username: usernameInput, password: passwordInput } 
        ]);

if (error) {
    console.error('Database Error:', error.message);
    
    // Check if the error is due to a duplicate username constraint
    if (error.code === '23505') {
        alert('Registration failed: That username is already taken!');
    } else {
        alert('Registration failed: ' + error.message);
    }
} else {
    console.log("Success:", data);
    alert('Account successfully provisioned into the secure cloud database!');
    form.reset();
}
});