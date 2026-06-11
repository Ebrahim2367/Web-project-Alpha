const SUPABASE_URL = 'https://eubzymhdjjgvhakswuki.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY;

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
        alert('Registration failed: ' + error.message);
    } else {
        console.log("Success:", data);
        alert('Account successfully provisioned into the secure cloud database!');
        form.reset(); 
       
    }
});