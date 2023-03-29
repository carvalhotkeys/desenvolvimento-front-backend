export default function autenticar(req, resp, next){
    if (req.session.usuariologado){
        next();

    }
    else{
        resp.redirect("/login.html");
    }
}