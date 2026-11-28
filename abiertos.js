/* Área de juegos: todos los juegos están abiertos todos los días.
   Los recursos que no están en ORDEN (p. ej. el Semáforo de turnos de Martín) no se cierran nunca.
   Cuando el niño termina un juego, ese juego se cierra hasta el día siguiente (los demás siguen abiertos).
   Cada vez que vuelve a hacer un juego salen palabras y dibujos distintos y, en los juegos con niveles, sube de nivel.
   Se guarda en el móvil o tablet de cada familia. */
window.ORDEN={"Clara": ["dm1", "dm2", "dm3", "silabas", "termina", "inicial", "porterias", "rimas"], "Noah": ["bienmal", "posicion", "falta", "cambia", "sonidos", "palmadas", "rimas", "magicas"], "Izan": ["silabas", "termina", "inicial", "porterias", "rimas", "leebusca", "rodea", "letra", "une", "donde"], "Paula": ["dlr1", "dlr2", "dlr3", "caza", "completa", "frases", "pulsera"], "Martín": ["sisi-zico", "inicial", "rimas", "mitad", "garaje", "szbien", "empieza", "donde", "leer", "completa"], "Arturo": ["dibujo", "iguales", "pareja", "repite", "sopa", "lectura", "magicas", "existe"], "Ariana": ["silaba", "slime", "fuente", "espejo", "adivina", "colado", "parejas", "haciendo"], "Erica": ["existe", "gemela", "laboratorio", "separa", "detective", "lectura", "caza", "ran"]};
window.NOMBRES={"Clara": {"dm1": "Dida y Mara · con dibujo", "dm2": "Dida y Mara · solo oído", "dm3": "Dida y Mara · palabras mágicas", "silabas": "Palmadas de sílabas", "termina": "Termina la palabra", "inicial": "¿Por qué letra empieza?", "porterias": "Las dos casetas", "rimas": "Cazarrimas"}, "Noah": {"bienmal": "¿Lo ha dicho bien?", "posicion": "¿En qué trozo suena?", "falta": "La sílaba perdida", "cambia": "Cambia el sonido", "sonidos": "Cuenta los sonidos", "magicas": "Palabras mágicas largas", "palmadas": "Palmadas de sílabas", "rimas": "Cazarrimas del mar"}, "Izan": {"silabas": "Palmadas de sílabas", "termina": "Termina la palabra", "inicial": "¿Por qué letra empieza?", "porterias": "Las dos porterías", "rimas": "Cazarrimas", "leebusca": "Lee y busca", "rodea": "Rodea la buena", "letra": "La letra que falta", "une": "Une cada palabra", "donde": "¿Dónde está la letra?"}, "Paula": {"dlr1": "¿D, L o R?", "dlr2": "Solo de oído", "dlr3": "Palabras inventadas", "caza": "Caza el sonido", "completa": "Completa con sentido", "frases": "Corrige la frase", "pulsera": "Pulsera de pistas"}, "Martín": {"sisi-zico": "Sisi y Zico", "inicial": "¿Cuál empieza igual?", "rimas": "Cazarrimas", "mitad": "La otra mitad", "semaforo": "Semáforo de turnos", "garaje": "El garaje de Sisi y Zico", "szbien": "¿Lo ha dicho bien?", "empieza": "¿Cuál empieza así?", "donde": "¿Dónde está la sílaba?", "leer": "Lee y busca", "completa": "Completa la palabra"}, "Arturo": {"dibujo": "¿Qué animal es?", "iguales": "Al microscopio", "pareja": "¿Cuál no tiene pareja?", "repite": "El intruso", "sopa": "Sopa de especies inventadas", "lectura": "Lectura en voz alta", "magicas": "Especies inventadas", "existe": "¿Existe o es inventada?"}, "Ariana": {"silaba": "La sílaba perdida", "slime": "Slime de sílabas", "fuente": "La fuente de las sirenas", "espejo": "El espejo de la reina", "adivina": "Las adivinanzas del unicornio", "colado": "¿Quién se ha colado?", "parejas": "Parejas mágicas", "haciendo": "¿Con qué lo hacemos?"}, "Erica": {"existe": "¿Existe o no existe?", "gemela": "La gemela", "laboratorio": "Laboratorio de palabras", "separa": "Separa la frase", "detective": "Detective de pistas", "lectura": "Lee y responde", "caza": "Caza la diferencia", "ran": "Nombra rápido"}};
window.ROT=(function(){
 function hoy(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
 function lee(k){try{return JSON.parse(localStorage.getItem(k))||null}catch(e){return null}}
 function est(n){var e=lee('rot2-'+n);if(!e){var v=lee('rot-'+n);e={h:{},c:{},base:(v&&v.vuelta)||1};guarda(n,e)}return e}
 function guarda(n,e){try{localStorage.setItem('rot2-'+n,JSON.stringify(e))}catch(x){}}
 function L(n){return window.ORDEN[n]||[]}
 function hechoJ(n,id){return est(n).h[id]===hoy()}
 function abierto(n,id){if(L(n).indexOf(id)<0)return true;return !hechoJ(n,id)}
 function pendientes(n){return L(n).filter(function(id){return !hechoJ(n,id)})}
 return {hoy:hoy,est:est,
  nombre:function(n,id){return ((window.NOMBRES[n]||{})[id])||id},
  enRotacion:function(n,id){return L(n).indexOf(id)>=0},
  abierto:abierto, hechoJuego:hechoJ, pendientes:pendientes,
  hechosHoy:function(n){return L(n).filter(function(id){return hechoJ(n,id)}).length},
  total:function(n){return L(n).length},
  /* compatibilidad con páginas antiguas */
  actual:function(n){return pendientes(n)[0]||L(n)[0]},
  hechoHoy:function(n){return L(n).length>0&&pendientes(n).length===0},
  siguiente:function(n){return pendientes(n)[0]||L(n)[0]},
  completar:function(n,id){if(L(n).indexOf(id)<0)return;var e=est(n);if(e.h[id]!==hoy()){e.h[id]=hoy();e.c[id]=(e.c[id]||0)+1;guarda(n,e)}},
  /* nº de vez que hace ese juego (sirve para subir de nivel) */
  vuelta:function(n,id){var e=est(n);if(!id)return e.base||1;return (e.base||1)+(e.c[id]||0)}};
})();
