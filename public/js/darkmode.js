//
const checkbox = document.getElementById('chk');
if(checkbox){
    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });
}
