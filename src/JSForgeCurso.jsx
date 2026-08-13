import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════
// LECCIONES — Cada una es un mini-curso
// ═══════════════════════════════════════
const LESSONS = [
  // ──────── LECCIÓN 1 ────────
  {
    id:"L01", title:"¿Qué es una variable?", icon:"📦", module:"Fundamentos",
    theory: `Pensá en una variable como una caja con una etiqueta.

La etiqueta es el NOMBRE que vos elegís.
Adentro de la caja guardás un VALOR (un número, un texto, lo que sea).

En JavaScript hay dos formas de crear cajas:

• const → la caja está sellada, no podés cambiar lo que tiene adentro después.
• let → la caja está abierta, podés cambiar el contenido.

REGLA DE ORO: usá const siempre, y let solo cuando sabés que el valor va a cambiar.`,
    example: {
      code: `const nombre = "Sebas";\nconst edad = 25;\nlet contador = 0;\n\ncontador = contador + 1;\n// contador ahora vale 1\n\n// nombre = "otro";  ← ESTO DA ERROR porque es const`,
      lines: [
        { t:`const nombre = "Sebas";`, e:`Creás una caja llamada "nombre" y le metés el texto "Sebas". const = no se puede cambiar después.` },
        { t:`const edad = 25;`, e:`Otra caja con el número 25 adentro.` },
        { t:`let contador = 0;`, e:`Esta caja SÍ se puede cambiar porque usamos let.` },
        { t:`contador = contador + 1;`, e:`Abrimos la caja, sacamos el 0, le sumamos 1, y guardamos el 1. Eso es "reasignar".` },
      ],
    },
    exercise: {
      desc: `Creá dos variables usando const:
1. Una llamada "ciudad" con el valor "Córdoba"  
2. Una llamada "poblacion" con el valor 1500000

Después escribí: return ciudad;

(Así la función devuelve el valor para que podamos verificar)`,
      starter: `function miCiudad() {\n  // Escribí acá:\n  // const ciudad = "...";\n  // const poblacion = ...;\n  // return ciudad;\n}`,
      fnName: "miCiudad",
      tests: [{ args:[], expected:"Córdoba", label:'miCiudad() → "Córdoba"' }],
      errorChecks: [
        { check: c => !c.includes("const"), msg: `No usaste "const". Para crear una variable constante escribí: const nombre = valor;` },
        { check: c => !c.includes("return"), msg: `Te falta "return". Sin return, la función no devuelve nada. Escribí "return ciudad;" al final.` },
        { check: c => c.includes("let ciudad"), msg: `Usaste "let" pero la consigna pide "const". Para valores que no cambian siempre usá const.` },
        { check: c => c.includes("cordoba") || c.includes("córdoba"), msg: `Revisá las mayúsculas. JavaScript distingue "Córdoba" de "córdoba". El valor debe ser exactamente "Córdoba" con C mayúscula.` },
      ],
    },
  },
  // ──────── LECCIÓN 2 ────────
  {
    id:"L02", title:"Anatomía de una función", icon:"🔧", module:"Fundamentos",
    theory: `Una función es una MÁQUINA que hace algo.

Le metés datos por un lado (INPUT), la máquina los procesa, y sale un resultado por el otro lado (OUTPUT).

La estructura SIEMPRE es esta:

function nombreDeLaFunción(loQueRecibe) {
    // acá adentro va el código
    return loQueDevuelve;
}

Cada parte tiene un nombre técnico:
• function → palabra clave obligatoria, le dice a JS "esto es una función"
• nombreDeLaFunción → el nombre que VOS elegís (sin espacios, sin tildes)
• (loQueRecibe) → el PARÁMETRO, es el input que entra. Vos elegís el nombre.
• { } → las llaves marcan dónde empieza y termina el código de la función
• return → DEVUELVE el resultado. Sin return, la función devuelve undefined (nada).

IMPORTANTE: el parámetro es solo un nombre que vos elegís para referirte al dato que entra. Cuando alguien llama a la función con un valor real, ese valor "reemplaza" al parámetro adentro de la función.`,
    example: {
      code: `function duplicar(numero) {\n  const resultado = numero * 2;\n  return resultado;\n}\n\nduplicar(5);   // → 10\nduplicar(100); // → 200`,
      lines: [
        { t:`function duplicar(numero) {`, e:`Creamos una función llamada "duplicar". Recibe UN dato que adentro vamos a llamar "numero". Cuando alguien escriba duplicar(5), "numero" vale 5.` },
        { t:`const resultado = numero * 2;`, e:`Creamos una variable "resultado" que guarda numero multiplicado por 2. Si numero es 5, resultado es 10.` },
        { t:`return resultado;`, e:`Devolvemos lo que calculamos. Sin esta línea, la función no devuelve nada.` },
        { t:`duplicar(5); // → 10`, e:`Llamamos a la función pasándole 5. Adentro, "numero" vale 5, entonces 5*2=10.` },
      ],
    },
    exercise: {
      desc: `Completá la función "triple" para que reciba un número y devuelva ese número multiplicado por 3.

Ya te doy la estructura, solo tenés que escribir el cálculo adentro:
1. Multiplicá el parámetro por 3
2. Devolvé el resultado con return`,
      starter: `function triple(numero) {\n  // Paso 1: calculá numero * 3\n  // Paso 2: devolvé el resultado con return\n  \n}`,
      fnName: "triple",
      tests: [
        { args:[4], expected:12, label:'triple(4) → 12' },
        { args:[0], expected:0, label:'triple(0) → 0' },
        { args:[-2], expected:-6, label:'triple(-2) → -6' },
      ],
      errorChecks: [
        { check: c => !c.includes("return"), msg: `Te falta "return". Tu función calcula algo pero no lo devuelve. Necesitás escribir "return" seguido del valor, por ejemplo: return numero * 3;` },
        { check: c => c.includes("numero * 2"), msg: `Estás multiplicando por 2, pero la consigna pide por 3. Cambiá el 2 por un 3.` },
        { check: c => c.includes("return;") && !c.includes("return ") && !c.includes("return\n"), msg: `Escribiste "return;" vacío. return necesita un valor al lado: return numero * 3;` },
        { check: (c,r) => r === undefined, msg: `La función devuelve undefined. Esto pasa cuando no hay "return" o cuando return no tiene un valor al lado. Escribí: return numero * 3;` },
      ],
    },
  },
  // ──────── LECCIÓN 3 ────────
  {
    id:"L03", title:"Tipos de datos", icon:"🏷️", module:"Fundamentos",
    theory: `En JavaScript, cada valor tiene un TIPO. Es como decir que en el mundo real hay diferentes cosas: textos, números, verdadero/falso.

Los tipos principales son:

• string → texto, siempre entre comillas: "hola", 'chau', \`template\`
• number → números (enteros o decimales): 42, 3.14, -7
• boolean → solo dos valores posibles: true o false
• undefined → "no tiene valor asignado"

Para saber el tipo de algo, usás typeof:

typeof "hola"   →  "string"
typeof 42       →  "number"  
typeof true     →  "boolean"

OJO: typeof devuelve un STRING con el nombre del tipo. Es decir, typeof 42 no devuelve number sino "number" (con comillas, es texto).`,
    example: {
      code: `typeof "Sebas"     // → "string"\ntypeof 25          // → "number"\ntypeof true        // → "boolean"\ntypeof undefined   // → "undefined"\n\n// Cuidado con estos:\ntypeof null        // → "object" ← bug histórico de JS\ntypeof [1,2,3]     // → "object" ← arrays son objetos`,
      lines: [
        { t:`typeof "Sebas"  // → "string"`, e:`Cualquier texto entre comillas es tipo string.` },
        { t:`typeof 25  // → "number"`, e:`Cualquier número (entero o decimal) es tipo number. Sin comillas.` },
        { t:`typeof true  // → "boolean"`, e:`true y false son los únicos valores boolean. Sirven para condiciones.` },
      ],
    },
    exercise: {
      desc: `Escribí una función "tipoDe" que reciba un valor y devuelva su tipo.

Lo que tenés que hacer adentro:
1. Usá typeof sobre el valor que recibe la función
2. Devolvé el resultado con return

Es literalmente una línea: return typeof valor;`,
      starter: `function tipoDe(valor) {\n  // Usá typeof para obtener el tipo\n  // y devolvelo con return\n  \n}`,
      fnName: "tipoDe",
      tests: [
        { args:[42], expected:"number", label:'tipoDe(42) → "number"' },
        { args:["hola"], expected:"string", label:'tipoDe("hola") → "string"' },
        { args:[true], expected:"boolean", label:'tipoDe(true) → "boolean"' },
      ],
      errorChecks: [
        { check: c => !c.includes("typeof"), msg: `No usaste "typeof". Para saber el tipo de un valor escribí: typeof valor — eso devuelve un string con el tipo.` },
        { check: c => !c.includes("return"), msg: `Te falta return. Escribí: return typeof valor;` },
        { check: c => c.includes("typeof("), msg: `typeof no necesita paréntesis. No es una función, es un operador. Escribí: typeof valor (sin paréntesis). Igual funciona con paréntesis pero es bueno saberlo.` },
      ],
    },
  },
  // ──────── LECCIÓN 4 ────────
  {
    id:"L04", title:"Comparar valores", icon:"⚖️", module:"Fundamentos",
    theory: `Para comparar dos valores en JavaScript usás operadores de comparación. El resultado SIEMPRE es true o false.

• === → ¿son iguales? (compara valor Y tipo) — SIEMPRE USÁ ESTE
• !== → ¿son diferentes?
• >   → ¿mayor que?
• <   → ¿menor que?
• >=  → ¿mayor o igual?
• <=  → ¿menor o igual?

¿Por qué ===  y no ==?
• === compara valor Y tipo: 5 === "5" es false (número vs string)
• == convierte tipos: 5 == "5" es true (convierte "5" a número)

== te puede causar bugs silenciosos. SIEMPRE usá ===.

El operador % (módulo) es útil para saber si un número es par:
• 8 % 2 = 0  →  8 dividido 2 = 4, resto 0 → es par
• 7 % 2 = 1  →  7 dividido 2 = 3, resto 1 → es impar`,
    example: {
      code: `5 === 5        // true  (mismo valor, mismo tipo)\n5 === "5"      // false (number vs string)\n10 > 3         // true\n10 >= 10       // true  (mayor O igual)\n\n// Módulo: el resto de la división\n8 % 2          // 0  → es par\n7 % 2          // 1  → es impar\n10 % 3         // 1  (10/3 = 3 con resto 1)`,
      lines: [
        { t:`5 === 5  // true`, e:`Mismo valor (5) y mismo tipo (number) → true.` },
        { t:`5 === "5"  // false`, e:`Mismo valor pero distinto tipo (number vs string) → false. Por eso === es mejor que ==.` },
        { t:`8 % 2  // 0`, e:`El operador % devuelve el RESTO de la división. 8 / 2 = 4 exacto, resto 0.` },
      ],
    },
    exercise: {
      desc: `Escribí una función "esPar" que reciba un número y devuelva true si es par, false si es impar.

Lógica:
1. Si numero % 2 es igual a 0, es par → devolvé true
2. Si no, es impar → devolvé false

Truco: podés devolver directamente la comparación:
return numero % 2 === 0;
(esto ya devuelve true o false automáticamente)`,
      starter: `function esPar(numero) {\n  // Si numero % 2 === 0, es par\n  // Devolvé true o false\n  \n}`,
      fnName: "esPar",
      tests: [
        { args:[4], expected:true, label:'esPar(4) → true' },
        { args:[7], expected:false, label:'esPar(7) → false' },
        { args:[0], expected:true, label:'esPar(0) → true' },
      ],
      errorChecks: [
        { check: c => !c.includes("return"), msg: `Te falta return. Escribí: return numero % 2 === 0;` },
        { check: c => c.includes("==") && !c.includes("==="), msg: `Usaste == (doble igual). Siempre usá === (triple igual) para comparar. Escribí: numero % 2 === 0` },
        { check: c => c.includes("% 0"), msg: `Estás dividiendo por 0. Para par/impar hay que dividir por 2: numero % 2` },
        { check: (c,r) => r === "true" || r === "false", msg: `Estás devolviendo el texto "true" o "false" (entre comillas). Devolvé el boolean sin comillas: return numero % 2 === 0; (sin comillas alrededor)` },
      ],
    },
  },
  // ──────── LECCIÓN 5 ────────
  {
    id:"L05", title:"Condicionales: if / else", icon:"🔀", module:"Fundamentos",
    theory: `Un condicional le dice al código: "SI pasa esto, hacé tal cosa. SI NO, hacé otra."

La estructura es:

if (condición) {
    // se ejecuta si la condición es true
} else {
    // se ejecuta si la condición es false
}

La condición es cualquier expresión que dé true o false.

También podés encadenar con else if:

if (nota >= 9) {
    return "Excelente";
} else if (nota >= 6) {
    return "Aprobado";
} else {
    return "Desaprobado";
}

JavaScript evalúa de arriba hacia abajo y se frena en la primera condición que sea true.`,
    example: {
      code: `function clasificar(nota) {\n  if (nota >= 9) {\n    return "Excelente";\n  } else if (nota >= 6) {\n    return "Aprobado";\n  } else {\n    return "Desaprobado";\n  }\n}\n\nclasificar(10); // → "Excelente"\nclasificar(7);  // → "Aprobado"\nclasificar(3);  // → "Desaprobado"`,
      lines: [
        { t:`if (nota >= 9) {`, e:`Primera pregunta: ¿la nota es 9 o más? Si sí, entra acá.` },
        { t:`} else if (nota >= 6) {`, e:`Si la primera fue false, pregunta: ¿es 6 o más? (ya sabemos que es menor a 9)` },
        { t:`} else {`, e:`Si ninguna de las anteriores fue true, cae acá.` },
      ],
    },
    exercise: {
      desc: `Escribí "etapa" que reciba una edad y devuelva:
• "niño" si tiene menos de 13
• "adolescente" si tiene 13 o más Y menos de 18
• "adulto" si tiene 18 o más

Usá if, else if, y else.`,
      starter: `function etapa(edad) {\n  // if (edad < 13) → "niño"\n  // else if (edad < 18) → "adolescente"\n  // else → "adulto"\n  \n}`,
      fnName: "etapa",
      tests: [
        { args:[8], expected:"niño", label:'etapa(8) → "niño"' },
        { args:[15], expected:"adolescente", label:'etapa(15) → "adolescente"' },
        { args:[25], expected:"adulto", label:'etapa(25) → "adulto"' },
        { args:[13], expected:"adolescente", label:'etapa(13) → "adolescente"' },
        { args:[18], expected:"adulto", label:'etapa(18) → "adulto"' },
      ],
      errorChecks: [
        { check: c => !c.includes("if"), msg: `No usaste "if". Empezá con: if (edad < 13) { return "niño"; }` },
        { check: c => !c.includes("return"), msg: `Te falta return adentro de cada bloque. Cada camino del if necesita su propio return.` },
        { check: c => c.includes("nino") && !c.includes("niño"), msg: `Escribiste "nino" sin ñ. JavaScript distingue caracteres. Usá "niño" con ñ.` },
      ],
    },
  },
  // ──────── LECCIÓN 6 ────────
  {
    id:"L06", title:"Strings: trabajar con texto", icon:"📝", module:"Fundamentos",
    theory: `Un string es texto entre comillas. Podés usar comillas dobles "", simples '', o backticks \`\`.

Los backticks son especiales: te permiten meter variables ADENTRO del texto:
\`Hola, \${nombre}!\`  →  "Hola, Sebas!"  (se llama template literal)

Métodos útiles de strings:
• str.toUpperCase()  →  convierte todo a MAYÚSCULAS
• str.toLowerCase()  →  convierte todo a minúsculas
• str.length  →  cuántos caracteres tiene (no es función, no lleva paréntesis)
• str[0]  →  primer carácter (los índices arrancan en 0)
• str.slice(inicio, fin)  →  corta una porción del texto
• str.includes("algo")  →  ¿contiene "algo"? true/false

IMPORTANTE: los strings son INMUTABLES. Los métodos devuelven un string NUEVO, el original no cambia.`,
    example: {
      code: `const nombre = "Sebas";\n\nnombre.toUpperCase()   // → "SEBAS"\nnombre.toLowerCase()   // → "sebas"\nnombre.length          // → 5\nnombre[0]              // → "S"\nnombre.slice(0, 3)     // → "Seb"\nnombre.includes("bas") // → true\n\n// Template literal:\n\`Hola, \${nombre}!\`     // → "Hola, Sebas!"`,
      lines: [
        { t:`nombre[0]  // → "S"`, e:`El primer carácter está en posición 0, no 1. Siempre se cuenta desde 0 en programación.` },
        { t:`nombre.slice(0, 3)  // → "Seb"`, e:`slice(inicio, fin): toma desde posición 0 hasta 3 (sin incluir el 3). O sea: posiciones 0, 1, 2.` },
        { t:`\`Hola, \${nombre}!\``, e:`Los backticks (\`) con \${} adentro reemplazan la variable por su valor. Esto se llama "template literal" o "interpolación".` },
      ],
    },
    exercise: {
      desc: `Escribí "capitalizar" que reciba un texto y devuelva el mismo texto con la primera letra en mayúscula y el resto en minúscula.

Ejemplo: capitalizar("hOLA") → "Hola"

Pasos:
1. str[0] te da la primera letra → pasala a mayúscula con .toUpperCase()
2. str.slice(1) te da todo DESDE la segunda letra → pasalo a minúscula con .toLowerCase()
3. Concatená ambas partes con + y devolvé con return`,
      starter: `function capitalizar(str) {\n  // Primer carácter en mayúscula: str[0].toUpperCase()\n  // Resto en minúscula: str.slice(1).toLowerCase()\n  // Juntá con + y devolvé con return\n  \n}`,
      fnName: "capitalizar",
      tests: [
        { args:["hola"], expected:"Hola", label:'capitalizar("hola") → "Hola"' },
        { args:["MUNDO"], expected:"Mundo", label:'capitalizar("MUNDO") → "Mundo"' },
      ],
      errorChecks: [
        { check: c => !c.includes("return"), msg: `Te falta return. Escribí: return str[0].toUpperCase() + str.slice(1).toLowerCase();` },
        { check: c => !c.includes("toUpperCase") && !c.includes("toLowerCase"), msg: `Necesitás usar .toUpperCase() y .toLowerCase(). Son métodos de string que convierten a mayúsculas/minúsculas.` },
        { check: c => !c.includes("slice") && !c.includes("substring"), msg: `Necesitás str.slice(1) para obtener todo desde el segundo carácter en adelante.` },
      ],
    },
  },
  // ──────── LECCIÓN 7 ────────
  {
    id:"L07", title:"Arrays: listas de datos", icon:"📋", module:"Arrays",
    theory: `Un array es una LISTA ordenada de valores. Se crea con corchetes [].

Cada elemento tiene una posición (índice) que empieza en 0:

const frutas = ["manzana", "banana", "naranja"];
//                  0          1         2

Propiedades y métodos básicos:
• arr.length → cuántos elementos tiene
• arr[0] → primer elemento
• arr[arr.length - 1] → último elemento
• arr.push("nuevo") → agrega al FINAL (modifica el array)
• arr.pop() → saca el ÚLTIMO (modifica el array)
• arr.includes("algo") → ¿contiene "algo"? true/false

Los arrays pueden tener cualquier tipo de dato adentro, incluso mezclados:
[1, "hola", true, null]`,
    example: {
      code: `const nums = [10, 20, 30, 40];\n\nnums.length     // → 4\nnums[0]         // → 10 (primero)\nnums[3]         // → 40 (último)\nnums.includes(20)  // → true\n\nnums.push(50);  // agrega 50 al final\n// nums ahora es [10, 20, 30, 40, 50]\n\nnums.pop();     // saca el 50\n// nums vuelve a [10, 20, 30, 40]`,
      lines: [
        { t:`nums[0]  // → 10`, e:`El primer elemento está en posición 0. Igual que con strings.` },
        { t:`nums.push(50)`, e:`push MODIFICA el array original agregando al final. No crea uno nuevo.` },
      ],
    },
    exercise: {
      desc: `Escribí "primeroYultimo" que reciba un array y devuelva un nuevo array con solo el primer y el último elemento.

Ejemplo: primeroYultimo([1,2,3,4]) → [1,4]

Pasos:
1. El primer elemento es arr[0]
2. El último es arr[arr.length - 1]
3. Devolvé un array nuevo con ambos: return [primero, ultimo];`,
      starter: `function primeroYultimo(arr) {\n  // const primero = arr[0];\n  // const ultimo = arr[arr.length - 1];\n  // return [primero, ultimo];\n  \n}`,
      fnName: "primeroYultimo",
      tests: [
        { args:[[1,2,3,4]], expected:[1,4], label:'primeroYultimo([1,2,3,4]) → [1,4]' },
        { args:[["a","b","c"]], expected:["a","c"], label:'primeroYultimo(["a","b","c"]) → ["a","c"]' },
      ],
      errorChecks: [
        { check: c => !c.includes("return"), msg: `Te falta return. Devolvé un array con los dos valores: return [arr[0], arr[arr.length - 1]];` },
        { check: c => c.includes("arr[-1]"), msg: `arr[-1] no funciona en JavaScript (sí en Python). Para el último usá arr[arr.length - 1].` },
      ],
    },
  },
  // ──────── LECCIÓN 8 ────────
  {
    id:"L08", title:"Arrays: .map() — transformar", icon:"🔄", module:"Arrays",
    theory: `.map() es EL método más importante de JavaScript moderno. Lo vas a usar todos los días con React.

¿Qué hace? Toma un array, le aplica una función a CADA elemento, y devuelve un ARRAY NUEVO con los resultados. El array original no se toca.

La estructura es:
array.map(elemento => quéHacerConCadaElemento)

Leelo así: "para CADA elemento del array, hacé esto y guardá el resultado en un array nuevo."

Ejemplo mental:
[1, 2, 3].map(n => n * 2)
Paso 1: n = 1 → 1 * 2 = 2
Paso 2: n = 2 → 2 * 2 = 4
Paso 3: n = 3 → 3 * 2 = 6
Resultado: [2, 4, 6]

La función que va adentro de map es una "arrow function" (flecha):
n => n * 2
Significa: "recibí n, devolvé n * 2".`,
    example: {
      code: `const precios = [100, 200, 300];\n\n// Aplicar 21% de IVA a cada precio:\nconst conIva = precios.map(p => p * 1.21);\n// conIva = [121, 242, 363]\n// precios sigue siendo [100, 200, 300]\n\n// Extraer nombres de objetos:\nconst users = [{name:"Ana"}, {name:"Luis"}];\nconst nombres = users.map(u => u.name);\n// nombres = ["Ana", "Luis"]`,
      lines: [
        { t:`precios.map(p => p * 1.21)`, e:`"Para cada p (precio), devolvé p * 1.21". La p es el nombre que VOS elegís para cada elemento.` },
        { t:`users.map(u => u.name)`, e:`"Para cada u (usuario), devolvé u.name". Extraemos solo la propiedad name de cada objeto.` },
      ],
    },
    exercise: {
      desc: `Escribí "duplicar" que reciba un array de números y devuelva un array nuevo con cada número multiplicado por 2.

Usá .map():
return nums.map(n => n * 2);

Esto dice: "para cada n del array, devolvé n * 2".`,
      starter: `function duplicar(nums) {\n  // return nums.map(n => ...);\n  \n}`,
      fnName: "duplicar",
      tests: [
        { args:[[1,2,3]], expected:[2,4,6], label:'duplicar([1,2,3]) → [2,4,6]' },
        { args:[[0,5,10]], expected:[0,10,20], label:'duplicar([0,5,10]) → [0,10,20]' },
        { args:[[]], expected:[], label:'duplicar([]) → []' },
      ],
      errorChecks: [
        { check: c => !c.includes("map"), msg: `No usaste .map(). Escribí: return nums.map(n => n * 2); — map recorre el array y transforma cada elemento.` },
        { check: c => !c.includes("return"), msg: `Te falta return. map devuelve un array nuevo, pero vos necesitás devolver ESE array: return nums.map(...);` },
        { check: c => c.includes(".map(n)") && !c.includes("=>"), msg: `Te falta la flecha (=>). La sintaxis es: .map(n => lo que devuelve). La flecha separa el parámetro de la operación.` },
      ],
    },
  },
  // ──────── LECCIÓN 9 ────────
  {
    id:"L09", title:"Arrays: .filter() — seleccionar", icon:"🔍", module:"Arrays",
    theory: `.filter() crea un array nuevo con solo los elementos que CUMPLEN una condición.

La función que le pasás debe devolver true (se queda) o false (se va).

Pensalo como un portero de boliche: mira a cada persona y decide si entra o no.

const nums = [1, 5, 10, 3, 8];
nums.filter(n => n > 4);
// Paso 1: n=1, 1>4? false → NO entra
// Paso 2: n=5, 5>4? true → SÍ entra
// Paso 3: n=10, 10>4? true → SÍ entra
// Paso 4: n=3, 3>4? false → NO entra
// Paso 5: n=8, 8>4? true → SÍ entra
// Resultado: [5, 10, 8]`,
    example: {
      code: `const edades = [12, 25, 8, 30, 16];\n\n// Solo mayores de 18:\nconst adultos = edades.filter(e => e >= 18);\n// [25, 30]\n\n// Solo pares:\nconst pares = edades.filter(e => e % 2 === 0);\n// [12, 8, 30, 16]\n\n// Filtrar objetos:\nconst alumnos = [{nota:8}, {nota:3}, {nota:6}];\nconst aprobados = alumnos.filter(a => a.nota >= 6);\n// [{nota:8}, {nota:6}]`,
      lines: [
        { t:`edades.filter(e => e >= 18)`, e:`"Para cada e (edad), ¿es >= 18?" Solo se quedan los true.` },
        { t:`alumnos.filter(a => a.nota >= 6)`, e:`Filtra objetos por una propiedad. Solo se quedan los alumnos con nota >= 6.` },
      ],
    },
    exercise: {
      desc: `Escribí "soloPositivos" que reciba un array de números y devuelva solo los mayores a 0.

Usá .filter():
return nums.filter(n => n > 0);`,
      starter: `function soloPositivos(nums) {\n  // return nums.filter(n => ...);\n  \n}`,
      fnName: "soloPositivos",
      tests: [
        { args:[[-3,0,5,-1,8]], expected:[5,8], label:'soloPositivos([-3,0,5,-1,8]) → [5,8]' },
        { args:[[1,2,3]], expected:[1,2,3], label:'soloPositivos([1,2,3]) → [1,2,3]' },
        { args:[[-1,-2]], expected:[], label:'soloPositivos([-1,-2]) → []' },
      ],
      errorChecks: [
        { check: c => !c.includes("filter"), msg: `No usaste .filter(). Escribí: return nums.filter(n => n > 0); — filter se queda solo con los que cumplen la condición.` },
        { check: c => !c.includes("return"), msg: `Te falta return. filter devuelve un array nuevo, devolvelo: return nums.filter(...);` },
        { check: c => c.includes(">= 0"), msg: `Usaste >= 0, pero eso incluye el 0. La consigna dice "mayores a 0", usá > 0 (sin el igual).` },
      ],
    },
  },
  // ──────── LECCIÓN 10 ────────
  {
    id:"L10", title:"Arrays: .reduce() — acumular", icon:"📊", module:"Arrays",
    theory: `reduce() es el método más poderoso (y al principio el más confuso). Toma un array y lo REDUCE a UN solo valor.

La estructura:
array.reduce((acumulador, elemento) => nuevoAcumulador, valorInicial)

• acumulador → el resultado que se va construyendo paso a paso
• elemento → cada item del array
• valorInicial → con qué arranca el acumulador (va después de la función, separado por coma)

Ejemplo paso a paso con suma:
[1, 2, 3, 4].reduce((acc, n) => acc + n, 0)

Paso 0: acc = 0 (valor inicial)
Paso 1: acc = 0 + 1 = 1
Paso 2: acc = 1 + 2 = 3
Paso 3: acc = 3 + 3 = 6
Paso 4: acc = 6 + 4 = 10
Resultado: 10

El truco: el valor inicial (ese 0 al final) es CRUCIAL. Sin él, reduce usa el primer elemento como acumulador inicial, lo cual puede causar bugs con arrays vacíos.`,
    example: {
      code: `const nums = [10, 20, 30];\n\n// Sumar todo:\nnums.reduce((acc, n) => acc + n, 0);\n// 0 + 10 = 10 → 10 + 20 = 30 → 30 + 30 = 60\n\n// Encontrar el mayor:\nnums.reduce((max, n) => n > max ? n : max, -Infinity);\n// → 30\n\n// Contar letras:\n"banana".split("").reduce((acc, letra) => {\n  acc[letra] = (acc[letra] || 0) + 1;\n  return acc;\n}, {});\n// { b:1, a:3, n:2 }`,
      lines: [
        { t:`(acc, n) => acc + n, 0`, e:`acc arranca en 0, y en cada paso le suma n. Al final tenés la suma total.` },
        { t:`n > max ? n : max`, e:`El operador ternario: ¿n es mayor que max? Si sí, usá n. Si no, mantené max. Es un if compacto.` },
      ],
    },
    exercise: {
      desc: `Escribí "sumarTodo" que reciba un array de números y devuelva la suma total usando reduce.

La línea exacta es:
return nums.reduce((acc, n) => acc + n, 0);

Donde:
• acc es el acumulador (empieza en 0)
• n es cada número del array
• acc + n suma el actual al acumulador
• el 0 final es el valor inicial`,
      starter: `function sumarTodo(nums) {\n  // return nums.reduce((acc, n) => acc + n, 0);\n  \n}`,
      fnName: "sumarTodo",
      tests: [
        { args:[[1,2,3,4]], expected:10, label:'sumarTodo([1,2,3,4]) → 10' },
        { args:[[10,-5,3]], expected:8, label:'sumarTodo([10,-5,3]) → 8' },
        { args:[[]], expected:0, label:'sumarTodo([]) → 0' },
      ],
      errorChecks: [
        { check: c => !c.includes("reduce"), msg: `No usaste .reduce(). Escribí: return nums.reduce((acc, n) => acc + n, 0);` },
        { check: c => c.includes("reduce(") && !c.includes(", 0"), msg: `Te falta el valor inicial (el 0 al final). Sin él, si el array está vacío da error. Agregá , 0) al final del reduce.` },
        { check: c => !c.includes("return"), msg: `Te falta return. Devolvé el resultado de reduce: return nums.reduce(...);` },
      ],
    },
  },
];

// ═══════════════════════════════════════
// ENGINE
// ═══════════════════════════════════════
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const runTest = async (code, ex) => {
  try {
    const fn = new Function(code + `\nreturn ${ex.fnName};`)();
    if (typeof fn !== "function") return { pass:false, error:`"${ex.fnName}" no es una función. ¿Escribiste bien el nombre?`, results:[] };
    const results = [];
    for (const t of ex.tests) {
      try {
        const r = fn(...t.args);
        results.push({ ...t, result:r, pass:deepEq(r, t.expected) });
      } catch(e) { results.push({ ...t, result:e.message, pass:false }); }
    }
    // Run custom error checks on failures
    if (!results.every(r => r.pass) && ex.errorChecks) {
      const firstFail = results.find(r => !r.pass);
      for (const chk of ex.errorChecks) {
        if (chk.check(code, firstFail?.result)) return { pass:false, error:null, results, hint: chk.msg };
      }
    }
    return { pass:results.every(r=>r.pass), results, error:null, hint:null };
  } catch(e) {
    // Parse syntax errors into friendly messages
    let msg = e.message;
    if (msg.includes("Unexpected token")) msg = `Error de sintaxis: JavaScript encontró algo inesperado. Revisá que no te falte un paréntesis, llave, o punto y coma. Detalle: ${e.message}`;
    if (msg.includes("is not defined")) { const v = msg.split(" ")[0]; msg = `"${v}" no está definido. ¿Escribiste bien el nombre? JavaScript distingue mayúsculas de minúsculas.`; }
    if (msg.includes("is not a function")) msg = `Estás intentando llamar algo como función pero no lo es. Revisá que el nombre esté bien escrito y que tenga paréntesis al lugar correcto.`;
    // Check custom errors
    if (ex.errorChecks) { for (const chk of ex.errorChecks) { if (chk.check(code, undefined)) return { pass:false, error:msg, results:[], hint:chk.msg }; } }
    return { pass:false, error:msg, results:[], hint:null };
  }
};

// ═══════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════
const SK = "jsforge-curso-v1";
const defP = () => ({ completed:{}, codes:{}, score:0, streak:0, best:0, lastDate:null, lesson:0 });
const load =  () => { try { const r = (() => { try { const v = localStorage.getItem(SK); return v ? { value: v } : null; } catch { return null; } })(); return r ? JSON.parse(r.value) : defP(); } catch { return defP(); } };
const save = d => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch(e) { console.error(e); } };

// ═══════════════════════════════════════
// APP
// ═══════════════════════════════════════
export default function App() {
  const [p, setP] = useState(defP());
  const [ok, setOk] = useState(false);
  const [view, setView] = useState("home"); // home, lesson
  const [li, setLi] = useState(0); // lesson index
  const [tab, setTab] = useState("theory"); // theory, example, exercise
  const [code, setCode] = useState("");
  const [res, setRes] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => { (() => { const d = load(); setP(d); setLi(d.lesson || 0); setOk(true); })(); }, []);
  const persist = useCallback(d => { setP(d); save(d); }, []);

  const openLesson = (i) => { setLi(i); const l = LESSONS[i]; setCode(p.codes[l.id] || l.exercise.starter); setRes(null); setTab("theory"); setView("lesson"); };

  const handleRun = async () => {
    setRunning(true);
    const l = LESSONS[li];
    const r = await runTest(code, l.exercise);
    setRes(r);
    if (r.pass) {
      let n = { ...p };
      if (!n.completed[l.id]) { n.completed[l.id] = true; n.score += 10; const t = new Date().toISOString().slice(0,10); const y = new Date(Date.now()-864e5).toISOString().slice(0,10); n.streak = n.lastDate===y ? n.streak+1 : (n.lastDate===t ? n.streak : 1); n.best = Math.max(n.best, n.streak); n.lastDate = t; }
      n.codes[l.id] = code;
      n.lesson = Math.max(n.lesson || 0, li + 1);
      persist(n);
    } else { const n = { ...p, codes: { ...p.codes, [l.id]: code } }; persist(n); }
    setRunning(false);
  };

  if (!ok) return <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#0d0d1a", color:"#fff", fontFamily:"system-ui" }}>Cargando...</div>;

  const c = { bg:"#0d0d1a", card:"#151525", border:"#252540", accent:"#f97316", green:"#22c55e", red:"#ef4444", yellow:"#eab308", text:"#ddd", dim:"#777" };
  const btn = (bg) => ({ background:bg||c.accent, color:"#fff", border:"none", padding:"10px 18px", borderRadius:"8px", cursor:"pointer", fontWeight:700, fontSize:"14px" });
  const btnO = { background:"transparent", color:c.dim, border:`1px solid ${c.border}`, padding:"8px 14px", borderRadius:"8px", cursor:"pointer", fontSize:"13px" };
  const card = { background:c.card, border:`1px solid ${c.border}`, borderRadius:"10px", padding:"18px", marginBottom:"14px" };
  const pg = { minHeight:"100vh", background:c.bg, color:c.text, fontFamily:"'Inter',system-ui", padding:"16px", maxWidth:"720px", margin:"0 auto" };

  // ════ HOME ════
  if (view === "home") {
    const done = Object.keys(p.completed).length;
    return <div style={pg}>
      <div style={{ marginBottom:"24px" }}>
        <h1 style={{ margin:0, fontSize:"22px", fontWeight:800, color:c.accent }}>JS FORGE</h1>
        <p style={{ margin:"4px 0 0", color:c.dim, fontSize:"13px" }}>Curso completo de JavaScript — Aprendé de verdad</p>
      </div>
      <div style={{ display:"flex", gap:"16px", marginBottom:"20px" }}>
        <div style={{ ...card, flex:1, textAlign:"center", margin:0 }}><div style={{ fontSize:"22px", fontWeight:800, color:c.accent }}>{done}</div><div style={{ color:c.dim, fontSize:"11px" }}>completadas</div></div>
        <div style={{ ...card, flex:1, textAlign:"center", margin:0 }}><div style={{ fontSize:"22px", fontWeight:800, color:c.green }}>{LESSONS.length}</div><div style={{ color:c.dim, fontSize:"11px" }}>lecciones</div></div>
        <div style={{ ...card, flex:1, textAlign:"center", margin:0 }}><div style={{ fontSize:"22px", fontWeight:800, color:c.yellow }}>🔥{p.streak}</div><div style={{ color:c.dim, fontSize:"11px" }}>racha</div></div>
      </div>
      <div style={{ background:c.card, borderRadius:"8px", height:"6px", marginBottom:"20px", overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(90deg,${c.accent},${c.green})`, height:"100%", width:`${done/LESSONS.length*100}%`, transition:"width .5s" }}/>
      </div>

      {LESSONS.map((l, i) => {
        const isDone = p.completed[l.id];
        const isNext = i === (p.lesson || 0);
        const isLocked = i > (p.lesson || 0);
        return <div key={l.id} style={{ ...card, opacity:isLocked?.4:1, cursor:isLocked?"default":"pointer", borderLeft:`3px solid ${isDone?c.green:isNext?c.accent:c.border}` }}
          onClick={() => !isLocked && openLesson(i)}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <span style={{ fontSize:"16px", marginRight:"8px" }}>{l.icon}</span>
              <span style={{ fontWeight:600, fontSize:"14px" }}>Lección {i+1}: {l.title}</span>
            </div>
            {isDone && <span style={{ color:c.green, fontWeight:700, fontSize:"16px" }}>✓</span>}
            {isNext && !isDone && <span style={{ color:c.accent, fontSize:"12px", fontWeight:600 }}>SIGUIENTE →</span>}
            {isLocked && <span style={{ color:c.dim, fontSize:"11px" }}>🔒</span>}
          </div>
          <div style={{ color:c.dim, fontSize:"11px", marginTop:"4px" }}>{l.module}</div>
        </div>;
      })}
    </div>;
  }

  // ════ LESSON ════
  const l = LESSONS[li];
  const tabs = [
    { id:"theory", label:"📖 Teoría", color:c.accent },
    { id:"example", label:"💻 Ejemplo", color:"#3b82f6" },
    { id:"exercise", label:"✏️ Ejercicio", color:c.green },
  ];

  return <div style={pg}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
      <button onClick={() => setView("home")} style={btnO}>← Inicio</button>
      <span style={{ color:c.dim, fontSize:"12px" }}>{li+1}/{LESSONS.length}</span>
    </div>
    <h2 style={{ margin:"0 0 12px", fontSize:"18px" }}>{l.icon} {l.title}</h2>

    {/* TABS */}
    <div style={{ display:"flex", gap:"6px", marginBottom:"16px" }}>
      {tabs.map(t => <button key={t.id} onClick={() => { setTab(t.id); if(t.id==="exercise") { setCode(p.codes[l.id] || l.exercise.starter); setRes(null); }}}
        style={{ ...btnO, borderColor: tab===t.id ? t.color : c.border, color: tab===t.id ? t.color : c.dim, fontWeight: tab===t.id ? 700 : 400, fontSize:"12px", padding:"6px 12px" }}>
        {t.label}
      </button>)}
    </div>

    {/* THEORY TAB */}
    {tab === "theory" && <div>
      <div style={{ ...card, borderLeft:`3px solid ${c.accent}` }}>
        <div style={{ fontSize:"14px", lineHeight:"1.8", whiteSpace:"pre-wrap", color:c.text }}>{l.theory}</div>
      </div>
      <button onClick={() => setTab("example")} style={btn()}>Ver ejemplo →</button>
    </div>}

    {/* EXAMPLE TAB */}
    {tab === "example" && <div>
      <pre style={{ background:"#0a0a18", border:`1px solid ${c.border}`, borderRadius:"8px", padding:"14px", overflow:"auto", fontSize:"12.5px", lineHeight:"1.6", color:"#a5d6ff", fontFamily:"'Fira Code',monospace", whiteSpace:"pre-wrap" }}><code>{l.example.code}</code></pre>
      {l.example.lines && <div style={{ marginTop:"12px" }}>
        <h4 style={{ margin:"0 0 8px", color:c.accent, fontSize:"13px" }}>Línea por línea:</h4>
        {l.example.lines.map((ln, i) => <div key={i} style={{ ...card, padding:"12px", borderLeft:`3px solid #3b82f6` }}>
          <code style={{ fontSize:"12px", color:"#a5d6ff", fontFamily:"monospace" }}>{ln.t}</code>
          <p style={{ margin:"6px 0 0", fontSize:"13px", lineHeight:"1.6", color:c.text }}>{ln.e}</p>
        </div>)}
      </div>}
      <button onClick={() => { setTab("exercise"); setCode(p.codes[l.id] || l.exercise.starter); setRes(null); }} style={btn(c.green)}>Ir al ejercicio →</button>
    </div>}

    {/* EXERCISE TAB */}
    {tab === "exercise" && <div>
      <div style={{ ...card, borderLeft:`3px solid ${c.green}` }}>
        <div style={{ fontSize:"13px", lineHeight:"1.7", whiteSpace:"pre-wrap", color:c.text }}>{l.exercise.desc}</div>
      </div>

      <textarea value={code} onChange={e => { setCode(e.target.value); setRes(null); }} spellCheck={false}
        style={{ width:"100%", minHeight:"160px", fontFamily:"'Fira Code',monospace", fontSize:"13px", lineHeight:"1.6", background:"#0a0a18", color:"#e0e0e0", border:`1px solid ${c.border}`, borderRadius:"8px", padding:"14px", resize:"vertical", outline:"none", tabSize:2, boxSizing:"border-box" }}
        onKeyDown={e => { if(e.key==="Tab"){ e.preventDefault(); const s=e.target.selectionStart; setCode(code.substring(0,s)+"  "+code.substring(e.target.selectionEnd)); setTimeout(()=>{e.target.selectionStart=e.target.selectionEnd=s+2},0); }}}/>

      <div style={{ display:"flex", gap:"8px", marginTop:"12px", flexWrap:"wrap" }}>
        <button onClick={handleRun} disabled={running} style={btn(c.green)}>{running?"Verificando...":"▶ Verificar"}</button>
        <button onClick={() => { setCode(l.exercise.starter); setRes(null); }} style={btnO}>↺ Reiniciar</button>
        <button onClick={() => setTab("theory")} style={btnO}>📖 Volver a la teoría</button>
      </div>

      {/* RESULTS */}
      {res && <div style={{ marginTop:"14px" }}>
        {res.pass ? <div style={{ ...card, borderLeft:`3px solid ${c.green}`, background:"#0a1a0a" }}>
          <p style={{ margin:0, fontWeight:700, color:c.green, fontSize:"15px" }}>✅ ¡Perfecto! Todos los tests pasaron.</p>
          {!p.completed[l.id] && <p style={{ margin:"6px 0 0", color:c.accent, fontSize:"13px" }}>+10 puntos</p>}
          {li < LESSONS.length - 1 && <button onClick={() => openLesson(li + 1)} style={{ ...btn(), marginTop:"12px" }}>Siguiente lección →</button>}
          {li === LESSONS.length - 1 && <p style={{ margin:"10px 0 0", color:c.green }}>🏆 ¡Completaste todas las lecciones!</p>}
        </div> : <div style={{ ...card, borderLeft:`3px solid ${c.red}`, background:"#1a0a0a" }}>
          {/* Friendly error feedback */}
          {res.hint && <div style={{ marginBottom:"12px", padding:"10px", background:"#1a1520", borderRadius:"6px", borderLeft:`3px solid ${c.yellow}` }}>
            <p style={{ margin:0, fontSize:"13px", lineHeight:"1.6", color:c.yellow }}>💡 <strong>Ayuda específica:</strong></p>
            <p style={{ margin:"6px 0 0", fontSize:"13px", lineHeight:"1.6", color:c.text }}>{res.hint}</p>
          </div>}
          {res.error && <p style={{ margin:"0 0 10px", fontFamily:"monospace", fontSize:"12px", color:c.red }}>❌ {res.error}</p>}
          {res.results.length > 0 && <>
            <p style={{ margin:"0 0 8px", fontWeight:700, color:c.red, fontSize:"14px" }}>❌ Algunos tests no pasaron:</p>
            {res.results.map((r, i) => <div key={i} style={{ padding:"6px 0", borderTop:i?`1px solid ${c.border}`:"", fontSize:"12px", fontFamily:"monospace" }}>
              <span style={{ color:r.pass?c.green:c.red }}>{r.pass?"✓":"✗"} {r.label}</span>
              {!r.pass && <div style={{ paddingLeft:"16px", marginTop:"4px" }}>
                <div style={{ color:c.dim }}>Esperado: <span style={{ color:c.yellow }}>{JSON.stringify(r.expected)}</span></div>
                <div style={{ color:c.dim }}>Recibido: <span style={{ color:c.red }}>{r.result === undefined ? "undefined (la función no devuelve nada — ¿falta return?)" : JSON.stringify(r.result)}</span></div>
              </div>}
            </div>)}
          </>}
          <button onClick={() => setTab("theory")} style={{ ...btnO, marginTop:"12px", fontSize:"12px" }}>📖 Repasar la teoría</button>
        </div>}
      </div>}
    </div>}

    {/* NAVIGATION */}
    <div style={{ display:"flex", justifyContent:"space-between", marginTop:"20px", paddingTop:"14px", borderTop:`1px solid ${c.border}` }}>
      {li > 0 ? <button onClick={() => openLesson(li-1)} style={btnO}>← Anterior</button> : <div/>}
      {li < LESSONS.length-1 && p.completed[l.id] && <button onClick={() => openLesson(li+1)} style={btnO}>Siguiente →</button>}
    </div>
  </div>;
}
