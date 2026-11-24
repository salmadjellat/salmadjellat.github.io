/* Juego del día: cada niño tiene un juego abierto al día, en este orden.
   Cuando lo termina se cierra y al día siguiente se abre el siguiente; al acabar la lista vuelve a empezar
   con palabras y dibujos distintos. Se guarda en el móvil o tablet de cada familia. */
window.ORDEN={"Clara": ["dm1", "dm2", "dm3", "silabas", "termina", "inicial", "porterias", "rimas"], "Noah": ["bienmal", "posicion", "falta", "cambia", "sonidos", "magicas"], "Izan": ["silabas", "termina", "inicial", "porterias", "rimas"], "Paula": ["dlr1", "dlr2", "dlr3", "caza", "completa", "frases", "pulsera"], "Martín": ["sisi-zico", "inicial", "rimas", "mitad"], "Arturo": ["dibujo", "iguales", "pareja", "repite", "sopa", "lectura", "magicas", "existe"]};
window.NOMBRES={"Clara": {"dm1": "Dida y Mara · con dibujo", "dm2": "Dida y Mara · solo oído", "dm3": "Dida y Mara · palabras mágicas", "silabas": "Palmadas de sílabas", "termina": "Termina la palabra", "inicial": "¿Por qué letra empieza?", "porterias": "Las dos torres", "rimas": "Cazarrimas"}, "Noah": {"bienmal": "¿Lo ha dicho bien?", "posicion": "¿En qué trozo suena?", "falta": "La sílaba perdida", "cambia": "Cambia el sonido", "sonidos": "Cuenta los sonidos", "magicas": "Palabras mágicas largas"}, "Izan": {"silabas": "Palmadas de sílabas", "termina": "Termina la palabra", "inicial": "¿Por qué letra empieza?", "porterias": "Las dos porterías", "rimas": "Cazarrimas"}, "Paula": {"dlr1": "¿D, L o R?", "dlr2": "Solo de oído", "dlr3": "Palabras inventadas", "caza": "Caza el sonido", "completa": "Completa con sentido", "frases": "Corrige la frase", "pulsera": "Pulsera de pistas"}, "Martín": {"sisi-zico": "Sisi y Zico", "inicial": "¿Cuál empieza igual?", "rimas": "Cazarrimas", "mitad": "La otra mitad", "semaforo": "Semáforo de turnos"}, "Arturo": {"dibujo": "¿Qué animal es?", "iguales": "Al microscopio", "pareja": "¿Cuál no tiene pareja?", "repite": "El intruso", "sopa": "Sopa de especies inventadas", "lectura": "Lectura en voz alta", "magicas": "Especies inventadas", "existe": "¿Existe o es inventada?"}};
window.ROT=(function(){
 function hoy(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
 function lee(n){try{return JSON.parse(localStorage.getItem('rot-'+n))||null}catch(e){return null}}
 function guarda(n,e){try{localStorage.setItem('rot-'+n,JSON.stringify(e))}catch(x){}}
 function est(n){var L=window.ORDEN[n]||[],e=lee(n)||{i:0,hecho:null,vuelta:1};
  if(e.hecho&&e.hecho<hoy()){e.i=(e.i+1)%Math.max(L.length,1);if(e.i===0)e.vuelta=(e.vuelta||1)+1;e.hecho=null;guarda(n,e)}
  if(!lee(n))guarda(n,e);return e}
 function actual(n){var L=window.ORDEN[n]||[];return L[est(n).i]||L[0]}
 function hechoHoy(n){return est(n).hecho===hoy()}
 function siguiente(n){var L=window.ORDEN[n]||[];return L[(est(n).i+1)%Math.max(L.length,1)]}
 return {hoy:hoy,est:est,actual:actual,hechoHoy:hechoHoy,siguiente:siguiente,
  nombre:function(n,id){return ((window.NOMBRES[n]||{})[id])||id},
  enRotacion:function(n,id){return (window.ORDEN[n]||[]).indexOf(id)>=0},
  abierto:function(n,id){if(!this.enRotacion(n,id))return true;return id===actual(n)&&!hechoHoy(n)},
  completar:function(n,id){var e=est(n);if(id===actual(n)&&!e.hecho){e.hecho=hoy();guarda(n,e)}},
  vuelta:function(n){return est(n).vuelta||1}};
})();
