function closeSession(){
    localStorage.setItem("token", "clear")
    setTimeout(function() {
        location.reload();
      }, 1000);
}