# Requirements

To run this project, you need to have the following packages installed:

```sh
pip install -r requirements.txt
```

[dbdiagram](https://dbdiagram.io/)  manage models








operatore = [...pacchi, coordinate] <br>
pacco = [coordinate, caratteristiche, success(bool?), *route]<br>
posizione = [lat, long]<br>
route = [posizioneA, posizioneB, *posizione] <br>
location = [nomeCitta, nomeVia,  *posizione] //inserimento csv nel db(?)


<pre>
pipeline: 
[
    POST login op (username;pw) >
    GET routes (lista route) >
    PUT
]
</pre>

urser-cookies prompt