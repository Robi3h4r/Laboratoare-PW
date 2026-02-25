function submitForm()
{
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Numele introdus este:" + nume);
    console.log("Email-ul introdus este:" + email);
    console.log("Mesajul introdus este:" + message);

    console.warn("Am terminat");
}