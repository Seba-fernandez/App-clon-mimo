import { useState, useEffect, useCallback } from "react";

// === THEORY CONTENT ===
const THEORY = {
  fundamentos: {
    title: "Fundamentos de JavaScript",
    sections: [
      {
        title: "Variables: let y const",
        content: `En JS tenés dos formas principales de declarar variables:

• const — para valores que NO van a cambiar. Usá const por defecto.
• let — para valores que SÍ van a cambiar (contadores, acumuladores, etc.).

Nunca uses var — es la forma vieja y tiene problemas de scope.`,
        code: `const nombre = "Sebas";    // no va a cambiar
let contador = 0;          // va a cambiar
contador = contador + 1;   // ✓ funciona
nombre = "otro";           // ✗ ERROR: no podés reasignar const`,
      },
      {
        title: "Tipos de datos y typeof",
        content: `JavaScript tiene estos tipos primitivos:

• string — texto entre comillas: "hola", 'chau', \`template\`
• number — números: 42, 3.14, -7
• boolean — true o false
• undefined — variable declarada pero sin valor
• null — valor vacío intencional
• object — objetos, arrays (sí, los arrays son objetos)

typeof te dice el tipo de un valor como string.`,
        code: `typeof "hola"      // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← trampa histórica de JS
typeof [1,2]       // "object"  ← los arrays son objetos
typeof {}          // "object"`,
      },
      {
        title: "Operadores de comparación",
        content: `Hay dos formas de comparar en JS:

• === (estricto) — compara valor Y tipo. SIEMPRE usá este.
• == (débil) — convierte tipos antes de comparar. Evitalo.

El operador % (módulo) devuelve el resto de una división. Es clave para saber si un número es par/impar.`,
        code: `5 === 5        // true
5 === "5"      // false (distinto tipo)
5 == "5"       // true  ← por eso evitamos ==

10 % 3         // 1  (10 / 3 = 3, resto 1)
8 % 2          // 0  (8 / 2 = 4, resto 0 → es par)
7 % 2          // 1  (7 / 2 = 3, resto 1 → es impar)`,
      },
      {
        title: "Métodos de string",
        content: `Los strings tienen métodos útiles que devuelven un NUEVO string (nunca modifican el original):`,
        code: `"hola".toUpperCase()       // "HOLA"
"HOLA".toLowerCase()       // "hola"
"hola mundo".slice(0, 4)   // "hola"
"hola mundo".slice(5)      // "mundo"
"hola"[0]                  // "h" (primer carácter)
"hola".length              // 4
"hola".includes("ol")      // true

// Template literals (backticks) — interpolar variables:
const nombre = "Sebas";
\`Hola, \${nombre}!\`         // "Hola, Sebas!"`,
      },
    ],
  },
  arrays: {
    title: "Arrays y sus métodos",
    sections: [
      {
        title: "¿Qué es un array?",
        content: `Un array es una lista ordenada de valores. Se crea con corchetes []. Cada elemento tiene un índice que empieza en 0.`,
        code: `const frutas = ["manzana", "banana", "naranja"];
frutas[0]          // "manzana"
frutas[2]          // "naranja"
frutas.length      // 3
frutas.push("uva") // agrega al final
frutas.pop()       // saca el último`,
      },
      {
        title: ".map() — transformar cada elemento",
        content: `map() crea un NUEVO array aplicando una función a cada elemento. No modifica el original. Es el método más usado en React para renderizar listas.`,
        code: `const nums = [1, 2, 3];

// Multiplicar cada uno por 2:
const dobles = nums.map(n => n * 2);
// dobles = [2, 4, 6]
// nums sigue siendo [1, 2, 3]

// Extraer una propiedad de objetos:
const usuarios = [{nombre: "Ana"}, {nombre: "Luis"}];
const nombres = usuarios.map(u => u.nombre);
// nombres = ["Ana", "Luis"]`,
      },
      {
        title: ".filter() — quedarse con algunos",
        content: `filter() crea un nuevo array solo con los elementos que cumplen una condición. La función que le pasás debe devolver true o false.`,
        code: `const nums = [1, 5, 10, 3, 8];

// Solo los mayores a 4:
const grandes = nums.filter(n => n > 4);
// grandes = [5, 10, 8]

// Solo los pares:
const pares = nums.filter(n => n % 2 === 0);
// pares = [10, 8]

// Filtrar objetos:
const alumnos = [{nota: 8}, {nota: 3}, {nota: 6}];
const aprobados = alumnos.filter(a => a.nota >= 6);
// [{nota: 8}, {nota: 6}]`,
      },
      {
        title: ".reduce() — acumular en un solo valor",
        content: `reduce() recorre el array y acumula un resultado. Recibe una función con (acumulador, valorActual) y un valor inicial. Es el más difícil pero el más poderoso.`,
        code: `const nums = [1, 2, 3, 4];

// Sumar todo:
const suma = nums.reduce((acc, n) => acc + n, 0);
// Paso a paso: 0+1=1, 1+2=3, 3+3=6, 6+4=10
// suma = 10

// Contar ocurrencias:
const letras = ["a", "b", "a", "c", "a"];
const conteo = letras.reduce((acc, letra) => {
  acc[letra] = (acc[letra] || 0) + 1;
  return acc;
}, {});
// conteo = { a: 3, b: 1, c: 1 }`,
      },
      {
        title: ".find() y encadenamiento",
        content: `find() devuelve el PRIMER elemento que cumple la condición, o undefined si no encuentra ninguno. Podés encadenar métodos uno tras otro.`,
        code: `const usuarios = [
  {id: 1, nombre: "Ana"},
  {id: 2, nombre: "Luis"},
];
const luis = usuarios.find(u => u.id === 2);
// {id: 2, nombre: "Luis"}

// Encadenamiento: filter → map → reduce
const alumnos = [{nota: 8}, {nota: 3}, {nota: 6}];
const promedioAprobados = alumnos
  .filter(a => a.nota >= 6)      // [{nota:8}, {nota:6}]
  .map(a => a.nota)              // [8, 6]
  .reduce((a, b) => a + b, 0)   // 14
  / alumnos.filter(a => a.nota >= 6).length;  // 14/2 = 7`,
      },
    ],
  },
  objetos: {
    title: "Objetos en JavaScript",
    sections: [
      {
        title: "Crear y acceder a objetos",
        content: `Un objeto es una colección de pares clave: valor. Se accede con punto (.) o corchetes ([]).`,
        code: `const persona = {
  nombre: "Sebas",
  edad: 25,
  ciudad: "Córdoba"
};

persona.nombre      // "Sebas"
persona["edad"]     // 25

// Agregar propiedades:
persona.trabajo = "dev";

// Verificar si existe:
"nombre" in persona  // true`,
      },
      {
        title: "Destructuring — extraer valores",
        content: `Destructuring te deja extraer propiedades de un objeto en variables individuales. Ahorra código y es MUY usado en React.`,
        code: `const persona = { nombre: "Sebas", edad: 25, ciudad: "Córdoba" };

// Sin destructuring (verbose):
const nombre = persona.nombre;
const edad = persona.edad;

// Con destructuring (limpio):
const { nombre, edad } = persona;

// Renombrar:
const { nombre: name } = persona; // name = "Sebas"

// Valores por defecto:
const { pais = "Argentina" } = persona;

// Anidado:
const data = { user: { name: "Sebas", address: { city: "CBA" } } };
const { user: { address: { city } } } = data;
// city = "CBA"`,
      },
      {
        title: "Spread (...) — copiar y mergear",
        content: `El operador spread (...) "desparrama" las propiedades de un objeto (o array) dentro de otro. Crea COPIAS, no referencias.`,
        code: `// Copiar un objeto:
const original = { a: 1, b: 2 };
const copia = { ...original };

// Mergear (combinar):
const defaults = { tema: "oscuro", idioma: "es" };
const custom = { idioma: "en" };
const config = { ...defaults, ...custom };
// { tema: "oscuro", idioma: "en" } ← el último gana

// También funciona con arrays:
const arr1 = [1, 2];
const arr2 = [3, 4];
const todos = [...arr1, ...arr2]; // [1, 2, 3, 4]`,
      },
      {
        title: "Object.keys/values/entries",
        content: `Métodos estáticos para trabajar con las propiedades de un objeto:`,
        code: `const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj)     // ["a", "b", "c"]
Object.values(obj)   // [1, 2, 3]
Object.entries(obj)  // [["a",1], ["b",2], ["c",3]]

// Iterar un objeto:
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// Crear objeto desde array de pares:
const pares = [["x", 10], ["y", 20]];
Object.fromEntries(pares) // { x: 10, y: 20 }`,
      },
    ],
  },
  funciones: {
    title: "Funciones avanzadas",
    sections: [
      {
        title: "Arrow functions",
        content: `Las arrow functions (=>) son una forma corta de escribir funciones. Son el estándar moderno en JS.`,
        code: `// Función tradicional:
function sumar(a, b) {
  return a + b;
}

// Arrow function equivalente:
const sumar = (a, b) => a + b;

// Si tiene un solo parámetro, sin paréntesis:
const doble = n => n * 2;

// Si tiene varias líneas, necesitás llaves y return:
const procesar = (n) => {
  const resultado = n * 2;
  return resultado + 1;
};`,
      },
      {
        title: "Callbacks — funciones como argumento",
        content: `Un callback es una función que le pasás a otra función para que la ejecute. Es el corazón de JS: map, filter, reduce, addEventListener, setTimeout — todos usan callbacks.`,
        code: `// setTimeout usa un callback:
setTimeout(() => {
  console.log("Pasaron 2 segundos");
}, 2000);

// map usa un callback:
[1,2,3].map(n => n * 2); // el arrow es el callback

// Crear tu propia función con callback:
function ejecutarDosVeces(fn) {
  fn();
  fn();
}
ejecutarDosVeces(() => console.log("hola"));
// "hola"
// "hola"`,
      },
      {
        title: "Closures — funciones que recuerdan",
        content: `Una closure se forma cuando una función interna accede a variables de su función padre, incluso después de que el padre terminó de ejecutarse. La función interna "recuerda" esas variables.`,
        code: `function crearContador() {
  let count = 0;           // variable del padre
  return function() {       // función interna (closure)
    count = count + 1;     // accede a count del padre
    return count;
  };
}

const contador = crearContador();
contador()  // 1
contador()  // 2 — ¡recuerda el valor anterior!
contador()  // 3

// Cada llamada a crearContador crea un scope nuevo:
const otro = crearContador();
otro()  // 1 — su propio count, independiente`,
      },
      {
        title: "Higher-order functions",
        content: `Una higher-order function (HOF) es una función que recibe una función como argumento Y/O devuelve una función. map, filter, reduce son HOFs. Crear las tuyas te da superpoderes.`,
        code: `// HOF que devuelve una función:
function multiplicador(factor) {
  return (n) => n * factor;
}
const triple = multiplicador(3);
triple(5)   // 15
triple(10)  // 30

// Pipeline: encadenar funciones
function pipeline(valor, funciones) {
  return funciones.reduce((acc, fn) => fn(acc), valor);
}
pipeline(5, [n => n * 2, n => n + 1])  // 11
// Paso 1: 5 * 2 = 10
// Paso 2: 10 + 1 = 11`,
      },
    ],
  },
  async: {
    title: "Código asíncrono",
    sections: [
      {
        title: "¿Qué es asíncrono?",
        content: `JavaScript es single-threaded: ejecuta una cosa a la vez. Cuando algo tarda (pedir datos a un servidor, leer un archivo), JS no se queda esperando bloqueado — lo lanza, sigue con otras cosas, y cuando llega la respuesta, ejecuta un callback. Eso es código asíncrono.`,
        code: `// Sincrónico (bloquea):
const resultado = calcularAlgo(); // espera acá
console.log(resultado);

// Asincrónico (no bloquea):
fetch("https://api.com/datos")   // lanza la petición
  .then(response => response.json())  // cuando llegue...
  .then(datos => console.log(datos)); // ...procesá

console.log("Esto se ejecuta ANTES que los datos lleguen");`,
      },
      {
        title: "Promises",
        content: `Una Promise es un objeto que representa un valor que todavía no llegó. Tiene tres estados: pending (esperando), fulfilled (resolvió con valor), rejected (falló con error).`,
        code: `// Crear una Promise:
const promesa = new Promise((resolve, reject) => {
  // resolve(valor) → la promise se cumple
  // reject(error) → la promise falla
  resolve(42);
});

// Consumir una Promise:
promesa
  .then(valor => console.log(valor))  // 42
  .catch(error => console.log(error));

// Atajo para crear una promise resuelta:
Promise.resolve(42)  // equivalente a new Promise(r => r(42))`,
      },
      {
        title: "async/await — promises sin .then()",
        content: `async/await es syntactic sugar sobre Promises. Hace que el código asíncrono se lea como sincrónico. Una función async SIEMPRE devuelve una Promise.`,
        code: `// Con .then() (más confuso):
function getData() {
  return fetch("/api/users")
    .then(res => res.json())
    .then(data => data.users);
}

// Con async/await (más claro):
async function getData() {
  const res = await fetch("/api/users");
  const data = await res.json();
  return data.users;  // se wrappea en Promise automático
}

// await SOLO funciona dentro de funciones async
// await "pausa" la función hasta que la Promise resuelva`,
      },
      {
        title: "try/catch y Promise.all",
        content: `try/catch es la forma de manejar errores con async/await. Promise.all ejecuta varias promises en paralelo.`,
        code: `// Manejo de errores:
async function seguro() {
  try {
    const data = await fetchQuePuedeFallar();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// Promise.all — ejecutar en paralelo:
async function cargarTodo() {
  const [users, posts, comments] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/comments").then(r => r.json()),
  ]);
  // Las 3 peticiones se lanzan a la vez, no una por una
}`,
      },
    ],
  },
};

// === EXERCISE DATA ===
const MODULES = [
  {
    id: "fundamentos", name: "Fundamentos", icon: "⚡", color: "#f97316",
    desc: "Variables, tipos, operadores, condicionales",
    exercises: [
      {
        id: "f1", title: "Tipo de dato", difficulty: 1, points: 10,
        desc: "Escribí una función `tipoDe` que reciba un valor y devuelva su tipo como string (usá typeof).",
        concept: "Usá el operador typeof que devuelve un string con el tipo del valor. Ejemplo: typeof 42 devuelve \"number\".",
        starter: "function tipoDe(valor) {\n  // Tu código acá\n}",
        fnName: "tipoDe",
        tests: [
          { args: [42], expected: "number", label: 'tipoDe(42)' },
          { args: ["hola"], expected: "string", label: 'tipoDe("hola")' },
          { args: [true], expected: "boolean", label: 'tipoDe(true)' },
          { args: [undefined], expected: "undefined", label: 'tipoDe(undefined)' },
        ],
        hints: ["typeof devuelve un string con el tipo", "return typeof valor"]
      },
      {
        id: "f2", title: "Par o impar", difficulty: 1, points: 10,
        desc: "Escribí `esPar` que reciba un número y devuelva `true` si es par, `false` si es impar.",
        concept: "El operador módulo (%) devuelve el resto de una división. Si n % 2 es 0, el número es par. Devolvé el resultado de esa comparación directamente.",
        starter: "function esPar(n) {\n  // Tu código acá\n}",
        fnName: "esPar",
        tests: [
          { args: [4], expected: true, label: 'esPar(4)' },
          { args: [7], expected: false, label: 'esPar(7)' },
          { args: [0], expected: true, label: 'esPar(0)' },
        ],
        hints: ["El operador módulo % devuelve el resto de la división", "n % 2 === 0 es true cuando n es par"]
      },
      {
        id: "f3", title: "Rango", difficulty: 2, points: 15,
        desc: "Escribí `enRango` que reciba un número, un mínimo y un máximo. Devuelva `true` si el número está entre min y max (inclusive).",
        concept: "Necesitás dos comparaciones unidas con && (AND lógico). El número debe ser >= al mínimo Y <= al máximo al mismo tiempo.",
        starter: "function enRango(n, min, max) {\n  // Tu código acá\n}",
        fnName: "enRango",
        tests: [
          { args: [5, 1, 10], expected: true, label: 'enRango(5, 1, 10)' },
          { args: [1, 1, 10], expected: true, label: 'enRango(1, 1, 10)' },
          { args: [11, 1, 10], expected: false, label: 'enRango(11, 1, 10)' },
        ],
        hints: ["Necesitás dos comparaciones con &&", "n >= min && n <= max"]
      },
      {
        id: "f4", title: "Capitalizar", difficulty: 2, points: 15,
        desc: "Escribí `capitalizar` que reciba un string y devuelva el mismo string con la primera letra en mayúscula y el resto en minúscula.",
        concept: "Accedé al primer carácter con str[0] y usá toUpperCase(). Para el resto usá str.slice(1) y toLowerCase(). Concatená ambas partes.",
        starter: "function capitalizar(str) {\n  // Tu código acá\n}",
        fnName: "capitalizar",
        tests: [
          { args: ["hola"], expected: "Hola", label: 'capitalizar("hola")' },
          { args: ["MUNDO"], expected: "Mundo", label: 'capitalizar("MUNDO")' },
          { args: ["a"], expected: "A", label: 'capitalizar("a")' },
        ],
        hints: ["str[0] te da el primer carácter", "str[0].toUpperCase() + str.slice(1).toLowerCase()"]
      },
    ]
  },
  {
    id: "arrays", name: "Arrays", icon: "📦", color: "#3b82f6",
    desc: "map, filter, reduce, find, encadenamiento",
    exercises: [
      {
        id: "a1", title: "Duplicar con map", difficulty: 1, points: 10,
        desc: "Escribí `duplicar` que reciba un array de números y devuelva un nuevo array con cada número multiplicado por 2.",
        concept: ".map() crea un nuevo array aplicando una función a cada elemento. Le pasás una arrow function que dice qué hacer con cada valor. No modifica el array original.",
        starter: "function duplicar(nums) {\n  // Tu código acá\n}",
        fnName: "duplicar",
        tests: [
          { args: [[1, 2, 3]], expected: [2, 4, 6], label: 'duplicar([1,2,3])' },
          { args: [[0, 5, 10]], expected: [0, 10, 20], label: 'duplicar([0,5,10])' },
          { args: [[]], expected: [], label: 'duplicar([])' },
        ],
        hints: ["nums.map(n => ...) aplica la función a cada n", "nums.map(n => n * 2)"]
      },
      {
        id: "a2", title: "Filtrar mayores", difficulty: 1, points: 10,
        desc: "Escribí `mayoresQue` que reciba un array de números y un umbral, y devuelva solo los números mayores al umbral.",
        concept: ".filter() crea un nuevo array solo con los elementos donde tu función devuelve true. Pensá en filter como un portero que deja pasar solo a los que cumplen la condición.",
        starter: "function mayoresQue(nums, umbral) {\n  // Tu código acá\n}",
        fnName: "mayoresQue",
        tests: [
          { args: [[1, 5, 10, 3, 8], 4], expected: [5, 10, 8], label: 'mayoresQue([1,5,10,3,8], 4)' },
          { args: [[1, 2, 3], 10], expected: [], label: 'mayoresQue([1,2,3], 10)' },
        ],
        hints: ["nums.filter(n => condición) devuelve los que cumplen", "nums.filter(n => n > umbral)"]
      },
      {
        id: "a3", title: "Sumar todo con reduce", difficulty: 2, points: 15,
        desc: "Escribí `sumarTodo` que reciba un array de números y devuelva la suma total usando reduce.",
        concept: ".reduce() recorre el array acumulando un resultado. Recibe (acumulador, valorActual) y un valor inicial. El acumulador arranca con el valor inicial y va creciendo con cada elemento.",
        starter: "function sumarTodo(nums) {\n  // Tu código acá\n}",
        fnName: "sumarTodo",
        tests: [
          { args: [[1, 2, 3, 4]], expected: 10, label: 'sumarTodo([1,2,3,4])' },
          { args: [[10, -5, 3]], expected: 8, label: 'sumarTodo([10,-5,3])' },
          { args: [[]], expected: 0, label: 'sumarTodo([])' },
        ],
        hints: ["reduce recibe (acumulador, valor) y un valor inicial", "nums.reduce((acc, n) => acc + n, 0) — el 0 es el valor inicial"]
      },
      {
        id: "a4", title: "Encontrar usuario", difficulty: 2, points: 15,
        desc: "Escribí `buscarPorId` que reciba un array de objetos con {id, nombre} y un id. Devuelva el objeto encontrado o null si no existe.",
        concept: ".find() devuelve el PRIMER elemento que cumple la condición, o undefined si no hay ninguno. Como te piden null en vez de undefined, usá el operador ?? (nullish coalescing) o || para convertir.",
        starter: "function buscarPorId(usuarios, id) {\n  // Tu código acá\n}",
        fnName: "buscarPorId",
        tests: [
          { args: [[{id:1,nombre:"Ana"},{id:2,nombre:"Luis"}], 2], expected: {id:2,nombre:"Luis"}, label: 'buscarPorId([...], 2)' },
          { args: [[{id:1,nombre:"Ana"}], 5], expected: null, label: 'buscarPorId([...], 5)' },
        ],
        hints: [".find(u => u.id === id) devuelve el primero que coincide", "Agregá ?? null o || null al final para convertir undefined en null"]
      },
      {
        id: "a5", title: "Encadenar métodos", difficulty: 3, points: 20,
        desc: "Escribí `promedioAprobados` que reciba un array de {nombre, nota}. Filtrá los que tienen nota >= 6, extraé sus notas, y devolvé el promedio. Si no hay aprobados, devolvé 0.",
        concept: "Encadená .filter() → .map() → .reduce() uno tras otro. filter para quedarte con los aprobados, map para extraer solo las notas, reduce para sumarlas. Después dividí por la cantidad. Cuidado: si no hay aprobados, no dividas por 0.",
        starter: "function promedioAprobados(alumnos) {\n  // Tu código acá\n}",
        fnName: "promedioAprobados",
        tests: [
          { args: [[{nombre:"A",nota:8},{nombre:"B",nota:4},{nombre:"C",nota:6}]], expected: 7, label: 'promedioAprobados([8,4,6])' },
          { args: [[{nombre:"A",nota:3},{nombre:"B",nota:2}]], expected: 0, label: 'promedioAprobados([3,2])' },
        ],
        hints: ["Primero .filter(a => a.nota >= 6), después .map(a => a.nota)", "const notas = aprobados; if (notas.length === 0) return 0; return suma / notas.length"]
      },
    ]
  },
  {
    id: "objetos", name: "Objetos", icon: "🔑", color: "#8b5cf6",
    desc: "Destructuring, spread, Object methods",
    exercises: [
      {
        id: "o1", title: "Destructuring básico", difficulty: 1, points: 10,
        desc: "Escribí `saludo` que reciba un objeto {nombre, edad} y devuelva el string \"Hola, [nombre]! Tenés [edad] años.\" usando destructuring.",
        concept: "Destructuring extrae propiedades de un objeto en variables: const { nombre, edad } = persona. Después usá template literals con backticks para armar el string: `Hola, ${nombre}!`",
        starter: "function saludo(persona) {\n  // Usá destructuring para extraer nombre y edad\n}",
        fnName: "saludo",
        tests: [
          { args: [{nombre:"Sebas",edad:25}], expected: "Hola, Sebas! Tenés 25 años.", label: 'saludo({nombre:"Sebas"...})' },
          { args: [{nombre:"Ana",edad:30}], expected: "Hola, Ana! Tenés 30 años.", label: 'saludo({nombre:"Ana"...})' },
        ],
        hints: ["const { nombre, edad } = persona;", "return `Hola, ${nombre}! Tenés ${edad} años.`"]
      },
      {
        id: "o2", title: "Spread para merge", difficulty: 2, points: 15,
        desc: "Escribí `merge` que reciba dos objetos y devuelva uno nuevo con las propiedades de ambos. Si hay claves repetidas, el segundo objeto gana.",
        concept: "El spread operator (...) desparrama las propiedades dentro de un nuevo objeto. Si hay claves repetidas, el último gana: { ...obj1, ...obj2 }.",
        starter: "function merge(obj1, obj2) {\n  // Tu código acá\n}",
        fnName: "merge",
        tests: [
          { args: [{a:1,b:2},{b:3,c:4}], expected: {a:1,b:3,c:4}, label: 'merge({a:1,b:2},{b:3,c:4})' },
          { args: [{},{x:1}], expected: {x:1}, label: 'merge({},{x:1})' },
        ],
        hints: ["return { ...obj1, ...obj2 }", "El segundo spread sobreescribe claves repetidas del primero"]
      },
      {
        id: "o3", title: "Object.entries transform", difficulty: 2, points: 15,
        desc: "Escribí `invertir` que reciba un objeto y devuelva uno nuevo donde las keys son los values y los values son las keys. Ejemplo: {a:\"1\"} → {\"1\":\"a\"}.",
        concept: "Object.entries(obj) te da un array de [key, value]. Podés mapearlo invirtiendo cada par y después reconstruir con Object.fromEntries() o con reduce.",
        starter: "function invertir(obj) {\n  // Tu código acá\n}",
        fnName: "invertir",
        tests: [
          { args: [{a:"1",b:"2"}], expected: {"1":"a","2":"b"}, label: 'invertir({a:"1",b:"2"})' },
          { args: [{x:"y"}], expected: {y:"x"}, label: 'invertir({x:"y"})' },
        ],
        hints: ["Object.entries(obj) devuelve [[\"a\",\"1\"],[\"b\",\"2\"]]", "Object.fromEntries(Object.entries(obj).map(([k,v]) => [v,k]))"]
      },
      {
        id: "o4", title: "Nested destructuring", difficulty: 3, points: 20,
        desc: "Escribí `ciudadDe` que reciba un objeto {nombre, direccion: {ciudad, pais}} y devuelva \"[nombre] vive en [ciudad], [pais].\"",
        concept: "Podés destructurar objetos anidados: const { nombre, direccion: { ciudad, pais } } = persona. Eso extrae ciudad y pais directamente del sub-objeto.",
        starter: "function ciudadDe(persona) {\n  // Usá destructuring anidado\n}",
        fnName: "ciudadDe",
        tests: [
          { args: [{nombre:"Sebas",direccion:{ciudad:"Córdoba",pais:"Argentina"}}], expected: "Sebas vive en Córdoba, Argentina.", label: 'ciudadDe({...Córdoba})' },
        ],
        hints: ["const { nombre, direccion: { ciudad, pais } } = persona", "return `${nombre} vive en ${ciudad}, ${pais}.`"]
      },
    ]
  },
  {
    id: "funciones", name: "Funciones", icon: "⚙️", color: "#10b981",
    desc: "Arrow functions, callbacks, closures, HOF",
    exercises: [
      {
        id: "fn1", title: "Arrow function", difficulty: 1, points: 10,
        desc: "Escribí `cuadrado` como una arrow function que reciba un número y devuelva su cuadrado.",
        concept: "Una arrow function se escribe: const fn = (param) => expresión. Si es un solo param, no necesitás paréntesis. Si es una sola expresión, no necesitás llaves ni return.",
        starter: "// Escribí cuadrado como arrow function\nconst cuadrado = ",
        fnName: "cuadrado",
        tests: [
          { args: [3], expected: 9, label: 'cuadrado(3)' },
          { args: [0], expected: 0, label: 'cuadrado(0)' },
          { args: [-4], expected: 16, label: 'cuadrado(-4)' },
        ],
        hints: ["const cuadrado = n => expresión", "const cuadrado = n => n * n"]
      },
      {
        id: "fn2", title: "Callback", difficulty: 2, points: 15,
        desc: "Escribí `aplicar` que reciba un array de números y una función callback. Devuelva un nuevo array con el callback aplicado a cada elemento (sin usar .map).",
        concept: "Un callback es una función que le pasás a otra función. Esa otra función la llama cuando la necesita. Acá tenés que iterar el array con un for o forEach, llamar callback(elemento) en cada vuelta, y guardar el resultado.",
        starter: "function aplicar(nums, callback) {\n  // Sin usar .map(), iterá y aplicá el callback\n}",
        fnName: "aplicar",
        tests: [
          { args: [[1,2,3], (n) => n * 2], expected: [2,4,6], label: 'aplicar([1,2,3], n=>n*2)' },
          { args: [[4,9], (n) => Math.sqrt(n)], expected: [2,3], label: 'aplicar([4,9], Math.sqrt)' },
        ],
        hints: ["Creá const resultado = []; iterá con for y pusheá callback(nums[i])", "callback es una función que llamás como callback(valor)"]
      },
      {
        id: "fn3", title: "Closure: contador", difficulty: 3, points: 20,
        desc: "Escribí `crearContador` que devuelva una función. Cada vez que llames a esa función devuelta, debe devolver un número incrementado (empezando en 1).",
        concept: "Una closure es una función que 'recuerda' variables de su scope padre. Declará let count = 0 dentro de crearContador, y devolvé una función interna que incremente y retorne count. La función interna 'cierra sobre' la variable count.",
        starter: "function crearContador() {\n  // Devolvé una función que recuerde el conteo\n}",
        fnName: "crearContador",
        tests: [
          { args: [], expected: "__CLOSURE_TEST__", label: 'const c = crearContador(); c() → 1, c() → 2, c() → 3' },
        ],
        closureTest: (fn) => {
          const counter = fn();
          return counter() === 1 && counter() === 2 && counter() === 3;
        },
        hints: ["Declará let count = 0 adentro de crearContador", "return function() { count++; return count; }"]
      },
      {
        id: "fn4", title: "Pipeline", difficulty: 3, points: 20,
        desc: "Escribí `pipeline` que reciba un valor inicial y un array de funciones. Devuelva el resultado de aplicar cada función en orden. Ej: pipeline(5, [f1, f2]) = f2(f1(5)).",
        concept: "Esto es reduce en acción: el acumulador es el valor que va pasando de función en función. Arrancás con el valor inicial, y en cada paso le aplicás la siguiente función.",
        starter: "function pipeline(valor, funciones) {\n  // Aplicá cada función en orden\n}",
        fnName: "pipeline",
        tests: [
          { args: [5, [(n)=>n*2, (n)=>n+1]], expected: 11, label: 'pipeline(5, [*2, +1])' },
          { args: ["hola", [(s)=>s.toUpperCase(), (s)=>s+"!"]], expected: "HOLA!", label: 'pipeline("hola", [upper, +!])' },
        ],
        hints: ["reduce donde el acumulador es el valor transformado", "funciones.reduce((acc, fn) => fn(acc), valor)"]
      },
    ]
  },
  {
    id: "async", name: "Async", icon: "🔄", color: "#ec4899",
    desc: "Promises, async/await, error handling",
    exercises: [
      {
        id: "as1", title: "Crear una Promise", difficulty: 2, points: 15,
        desc: "Escribí `esperar` que reciba un valor y devuelva una Promise que resuelva con ese valor.",
        concept: "new Promise((resolve, reject) => { resolve(valor) }) crea una promise que se resuelve con el valor. O más simple: Promise.resolve(valor) hace lo mismo en una línea.",
        starter: "function esperar(valor) {\n  // Devolvé una Promise que resuelva con valor\n}",
        fnName: "esperar",
        tests: [
          { args: [42], expected: 42, label: 'await esperar(42)', async: true },
          { args: ["hola"], expected: "hola", label: 'await esperar("hola")', async: true },
        ],
        hints: ["return new Promise((resolve) => resolve(valor))", "O más corto: return Promise.resolve(valor)"]
      },
      {
        id: "as2", title: "Async/await: transformar", difficulty: 2, points: 15,
        desc: "Escribí `fetchYTransformar` como función async. Recibe una función async `fetcher` y una función `transformar`. Esperá el resultado de fetcher() y devolvé transformar(resultado).",
        concept: "await 'pausa' la función async hasta que la promise se resuelva. Guardá el resultado de await fetcher() en una variable, y después aplicale la función transformar.",
        starter: "async function fetchYTransformar(fetcher, transformar) {\n  // await el fetcher, transformá el resultado\n}",
        fnName: "fetchYTransformar",
        tests: [
          { args: [async()=>5, (n)=>n*2], expected: 10, label: 'fetchYTransformar(→5, *2)', async: true },
          { args: [async()=>"hola", (s)=>s.length], expected: 4, label: 'fetchYTransformar(→"hola", .length)', async: true },
        ],
        hints: ["const data = await fetcher();", "return transformar(data);"]
      },
      {
        id: "as3", title: "Try/catch con async", difficulty: 3, points: 20,
        desc: "Escribí `seguro` como función async. Recibe una función async `fn`. Si fn() resuelve, devolvé {ok: true, data: resultado}. Si falla, devolvé {ok: false, error: mensaje del error}.",
        concept: "try/catch con async: try { const data = await fn(); return éxito } catch(e) { return error }. El error tiene una propiedad .message con el texto del error.",
        starter: "async function seguro(fn) {\n  // try/catch para manejar éxito y error\n}",
        fnName: "seguro",
        tests: [
          { args: [async()=>42], expected: {ok:true,data:42}, label: 'seguro(→42)', async: true },
          { args: [async()=>{throw new Error("falló")}], expected: {ok:false,error:"falló"}, label: 'seguro(→throw)', async: true },
        ],
        hints: ["try { const data = await fn(); return {ok:true,data} }", "catch(e) { return {ok:false, error: e.message} }"]
      },
      {
        id: "as4", title: "Promise.all", difficulty: 3, points: 20,
        desc: "Escribí `paralelo` que reciba un array de funciones async y las ejecute todas en paralelo. Devuelva un array con todos los resultados.",
        concept: "Promise.all() recibe un array de promises y devuelve una promise que resuelve cuando TODAS terminan. Primero tenés que llamar cada función para obtener las promises, y después pasarlas a Promise.all.",
        starter: "async function paralelo(funciones) {\n  // Ejecutá todas en paralelo con Promise.all\n}",
        fnName: "paralelo",
        tests: [
          { args: [[async()=>1,async()=>2,async()=>3]], expected: [1,2,3], label: 'paralelo([→1,→2,→3])', async: true },
        ],
        hints: ["funciones.map(fn => fn()) llama cada función y devuelve un array de promises", "return Promise.all(funciones.map(fn => fn()))"]
      },
    ]
  },
];

const EXAM_QUESTIONS = [
  {
    id: "ex1", title: "Aplanar array", difficulty: 3, points: 25,
    desc: "Escribí `aplanar` que reciba un array de arrays y devuelva un solo array con todos los elementos. Ej: [[1,2],[3,4]] → [1,2,3,4]. Usá reduce.",
    concept: "Usá reduce donde el acumulador es un array que va creciendo. En cada paso, concatená el sub-array actual al acumulador con spread o .concat().",
    starter: "function aplanar(arrays) {\n  \n}",
    fnName: "aplanar",
    tests: [
      { args: [[[1,2],[3,4],[5]]], expected: [1,2,3,4,5], label: 'aplanar([[1,2],[3,4],[5]])' },
      { args: [[[],["a","b"]]], expected: ["a","b"], label: 'aplanar([[],["a","b"]])' },
    ],
    hints: ["arrays.reduce((acc, arr) => ..., [])", "arrays.reduce((acc, arr) => [...acc, ...arr], [])"]
  },
  {
    id: "ex2", title: "Agrupar por propiedad", difficulty: 3, points: 25,
    desc: "Escribí `agruparPor` que reciba un array de objetos y un nombre de propiedad. Devuelva un objeto donde cada key es un valor de esa propiedad, y el value es un array de objetos.",
    concept: "Usá reduce con un objeto vacío como acumulador. En cada paso, leé la propiedad del item, creá el array si no existe, y pusheá el item.",
    starter: "function agruparPor(items, prop) {\n  \n}",
    fnName: "agruparPor",
    tests: [
      { args: [[{tipo:"a",v:1},{tipo:"b",v:2},{tipo:"a",v:3}],"tipo"], expected: {a:[{tipo:"a",v:1},{tipo:"a",v:3}],b:[{tipo:"b",v:2}]}, label: 'agruparPor([...], "tipo")' },
    ],
    hints: ["items.reduce((acc, item) => { const key = item[prop]; ... }, {})", "if (!acc[key]) acc[key] = []; acc[key].push(item); return acc;"]
  },
  {
    id: "ex3", title: "Una sola vez (closure)", difficulty: 3, points: 25,
    desc: "Escribí `unaVez` que reciba una función y devuelva una nueva función que solo se pueda ejecutar una vez. Las siguientes llamadas devuelvan el mismo resultado.",
    concept: "Closure: guardá una variable 'llamada' y una variable 'resultado'. La primera vez que se llama, ejecutá la función, guardá el resultado y marcá como llamada. Las siguientes veces, devolvé el resultado guardado.",
    starter: "function unaVez(fn) {\n  \n}",
    fnName: "unaVez",
    tests: [
      { args: [], expected: "__CLOSURE_TEST__", label: 'let c=0; const f=unaVez(()=>++c); f()→1, f()→1, c→1' },
    ],
    closureTest: (fn) => {
      let count = 0;
      const wrapped = fn(() => ++count);
      const r1 = wrapped();
      const r2 = wrapped();
      return r1 === 1 && r2 === 1 && count === 1;
    },
    hints: ["let llamada = false; let resultado;", "return function() { if (!llamada) { resultado = fn(); llamada = true; } return resultado; }"]
  },
  {
    id: "ex4", title: "Async retry", difficulty: 3, points: 25,
    desc: "Escribí `reintentar` (async) que reciba una función async `fn` y un número `intentos`. Ejecutá fn(). Si falla y quedan intentos, reintentá. Si se agotan, lanzá el último error.",
    concept: "Usá un loop for con try/catch. En cada iteración intentá await fn(). Si funciona, retorná. Si falla y es el último intento, lanzá el error. Si no es el último, el loop continúa.",
    starter: "async function reintentar(fn, intentos) {\n  \n}",
    fnName: "reintentar",
    tests: [
      { args: [async()=>42, 3], expected: 42, label: 'reintentar(→42, 3)', async: true },
      { args: [], expected: "__CUSTOM_ASYNC_TEST__", label: 'falla 2 veces, éxito la 3ra' },
    ],
    customAsyncTest: async (fn) => {
      let calls = 0;
      const flaky = async () => { calls++; if (calls < 3) throw new Error("fail"); return "ok"; };
      const result = await fn(flaky, 3);
      return result === "ok" && calls === 3;
    },
    hints: ["for (let i = 0; i < intentos; i++) { try { return await fn(); } catch(e) { if (i === intentos - 1) throw e; } }", "El throw e dentro del catch relanza el error si ya no hay más intentos"]
  },
];

// === EXECUTION ENGINE ===
const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const runTests = async (code, exercise) => {
  try {
    const results = [];
    for (const test of exercise.tests) {
      if (test.expected === "__CLOSURE_TEST__") {
        try {
          const factory = new Function(code + `\nreturn ${exercise.fnName};`);
          const fn = factory();
          const pass = exercise.closureTest(fn);
          results.push({ ...test, pass, result: pass ? "✓ Closure funciona" : "✗ Closure incorrecta" });
        } catch (e) { results.push({ ...test, pass: false, result: e.message }); }
      } else if (test.expected === "__CUSTOM_ASYNC_TEST__") {
        try {
          const factory = new Function(code + `\nreturn ${exercise.fnName};`);
          const fn = factory();
          const pass = await exercise.customAsyncTest(fn);
          results.push({ ...test, pass, result: pass ? "✓ Test custom pasó" : "✗ Test custom falló" });
        } catch (e) { results.push({ ...test, pass: false, result: e.message }); }
      } else {
        try {
          const factory = new Function(code + `\nreturn ${exercise.fnName};`);
          const fn = factory();
          if (typeof fn !== "function") { results.push({ ...test, pass: false, result: `${exercise.fnName} no es una función` }); continue; }
          const result = test.async ? await fn(...test.args) : fn(...test.args);
          const pass = deepEqual(result, test.expected);
          results.push({ ...test, pass, result });
        } catch (e) { results.push({ ...test, pass: false, result: e.message }); }
      }
    }
    return { results, allPass: results.every(r => r.pass), error: null };
  } catch (e) {
    return { results: [], allPass: false, error: e.message };
  }
};

// === STORAGE ===
const STORE_KEY = "jsforge-v2";
const defaultProgress = () => ({
  completed: {}, scores: {}, totalScore: 0, currentStreak: 0,
  bestStreak: 0, lastDate: null, examScore: null, examResults: null,
});

const loadProgress = async () => {
  try {
    const stored = window.localStorage.getItem(STORE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress();
  } catch {
    return defaultProgress();
  }
};
const saveProgress = async (data) => {
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify(data)); }
  catch (e) { console.error(e); }
};

// === MINI COMPONENTS ===
const Badge = ({ children, color }) => (
  <span style={{ background: color || "#333", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px" }}>
    {children}
  </span>
);

const DiffBadge = ({ level }) => {
  const m = { 1: ["BÁSICO","#22c55e"], 2: ["INTERMEDIO","#eab308"], 3: ["AVANZADO","#ef4444"] };
  const [t,c] = m[level] || m[1];
  return <Badge color={c}>{t}</Badge>;
};

const CodeBlock = ({ code }) => (
  <pre style={{
    background: "#12121f", border: "1px solid #2a2a3e", borderRadius: "6px", padding: "12px",
    overflow: "auto", fontSize: "12.5px", lineHeight: "1.6", color: "#a5d6ff",
    fontFamily: "'Fira Code', 'Cascadia Code', monospace", margin: "8px 0",
  }}>
    <code>{code}</code>
  </pre>
);

const CodeEditor = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={e => onChange(e.target.value)}
    spellCheck={false}
    style={{
      width: "100%", minHeight: "160px", fontFamily: "'Fira Code', 'Cascadia Code', monospace",
      fontSize: "13px", lineHeight: "1.6", background: "#1a1a2e", color: "#e0e0e0",
      border: "1px solid #333", borderRadius: "6px", padding: "12px", resize: "vertical",
      outline: "none", tabSize: 2, boxSizing: "border-box",
    }}
    onKeyDown={e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = e.target.selectionStart;
        onChange(value.substring(0, s) + "  " + value.substring(e.target.selectionEnd));
        setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }, 0);
      }
    }}
  />
);

// === MAIN APP ===
export default function JSForge() {
  const [progress, setProgress] = useState(defaultProgress());
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("dashboard");
  const [currentModule, setCurrentModule] = useState(null);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [showConcept, setShowConcept] = useState(false);
  const [examIdx, setExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examResults, setExamResults] = useState(null);
  const [theorySection, setTheorySection] = useState(0);

  useEffect(() => { loadProgress().then(p => { setProgress(p); setLoaded(true); }); }, []);
  const persist = useCallback(async (p) => { setProgress(p); await saveProgress(p); }, []);

  const updateStreak = (p) => {
    const today = new Date().toISOString().slice(0, 10);
    const np = { ...p };
    if (p.lastDate === today) return np;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    np.currentStreak = p.lastDate === yesterday ? p.currentStreak + 1 : 1;
    np.bestStreak = Math.max(np.bestStreak, np.currentStreak);
    np.lastDate = today;
    return np;
  };

  const totalExercises = MODULES.reduce((s, m) => s + m.exercises.length, 0);
  const completedCount = Object.keys(progress.completed).length;

  const openModule = (mod) => { setCurrentModule(mod); setCurrentExIdx(0); setTheorySection(0); setView("module"); };
  const openTheory = (mod) => { setCurrentModule(mod); setTheorySection(0); setView("theory"); };
  const openExercise = (mod, idx) => {
    setCurrentModule(mod); setCurrentExIdx(idx);
    const ex = mod.exercises[idx];
    setCode(progress.scores[ex.id]?.code || ex.starter);
    setTestResults(null); setHintsShown(0); setShowConcept(false); setView("exercise");
  };
  const openExam = () => { setExamIdx(0); setExamAnswers({}); setExamResults(null); setCode(EXAM_QUESTIONS[0].starter); setTestResults(null); setShowConcept(false); setView("exam"); };

  const handleRun = async () => {
    setRunning(true);
    const ex = view === "exam" ? EXAM_QUESTIONS[examIdx] : currentModule.exercises[currentExIdx];
    const result = await runTests(code, ex);
    setTestResults(result);
    if (result.allPass && view !== "exam") {
      let np = { ...progress };
      if (!np.completed[ex.id]) {
        np.completed[ex.id] = true;
        np.totalScore = (np.totalScore || 0) + ex.points;
        np = updateStreak(np);
      }
      np.scores[ex.id] = { code, points: ex.points };
      await persist(np);
    }
    if (result.allPass && view === "exam") {
      setExamAnswers(prev => ({ ...prev, [EXAM_QUESTIONS[examIdx].id]: { code, pass: true, points: EXAM_QUESTIONS[examIdx].points } }));
    }
    setRunning(false);
  };

  const finishExam = async () => {
    const total = EXAM_QUESTIONS.reduce((s, q) => s + (examAnswers[q.id]?.pass ? q.points : 0), 0);
    const max = EXAM_QUESTIONS.reduce((s, q) => s + q.points, 0);
    const res = { total, max, pct: Math.round((total / max) * 100), answers: examAnswers };
    let np = { ...progress, examScore: res.total, examResults: res };
    np = updateStreak(np);
    await persist(np);
    setExamResults(res); setView("examResults");
  };

  if (!loaded) return <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#0f0f1a", color:"#fff", fontFamily:"system-ui" }}>Cargando...</div>;

  const S = {
    page: { minHeight:"100vh", background:"#0f0f1a", color:"#e0e0e0", fontFamily:"'Inter',system-ui,sans-serif", padding:"16px", maxWidth:"900px", margin:"0 auto" },
    card: { background:"#1a1a2e", border:"1px solid #2a2a3e", borderRadius:"8px", padding:"16px", marginBottom:"12px" },
    btn: (c) => ({ background:c||"#f97316", color:"#fff", border:"none", padding:"8px 16px", borderRadius:"6px", cursor:"pointer", fontWeight:600, fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px" }),
    btnO: { background:"transparent", color:"#999", border:"1px solid #333", padding:"8px 16px", borderRadius:"6px", cursor:"pointer", fontSize:"13px" },
  };

  // ============ DASHBOARD ============
  if (view === "dashboard") {
    return (
      <div style={S.page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px", flexWrap:"wrap", gap:"12px" }}>
          <div>
            <h1 style={{ margin:0, fontSize:"24px", fontWeight:800, color:"#f97316" }}>JS FORGE</h1>
            <p style={{ margin:"4px 0 0", color:"#666", fontSize:"13px" }}>Tu fragua de JavaScript — de cero a entrevista</p>
          </div>
          <div style={{ display:"flex", gap:"16px", fontSize:"13px" }}>
            <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px", fontWeight:700, color:"#f97316" }}>{progress.totalScore}</div><div style={{ color:"#666" }}>puntos</div></div>
            <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px", fontWeight:700, color:"#22c55e" }}>{completedCount}/{totalExercises}</div><div style={{ color:"#666" }}>resueltos</div></div>
            <div style={{ textAlign:"center" }}><div style={{ fontSize:"20px", fontWeight:700, color:"#eab308" }}>🔥 {progress.currentStreak}</div><div style={{ color:"#666" }}>racha</div></div>
          </div>
        </div>
        <div style={{ background:"#1a1a2e", borderRadius:"8px", height:"8px", marginBottom:"24px", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(90deg,#f97316,#22c55e)", height:"100%", width:`${(completedCount/totalExercises)*100}%`, borderRadius:"8px", transition:"width 0.5s" }} />
        </div>
        {MODULES.map((mod, mi) => {
          const done = mod.exercises.filter(e => progress.completed[e.id]).length;
          const total = mod.exercises.length;
          return (
            <div key={mod.id} style={{ ...S.card, borderLeft:`3px solid ${mod.color}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div><span style={{ fontSize:"18px", marginRight:"8px" }}>{mod.icon}</span><span style={{ fontWeight:700, fontSize:"15px" }}>Módulo {mi+1}: {mod.name}</span></div>
                <span style={{ color: done===total ? "#22c55e" : "#666", fontSize:"13px", fontWeight:600 }}>{done===total ? "✓ COMPLETO" : `${done}/${total}`}</span>
              </div>
              <p style={{ color:"#666", fontSize:"13px", margin:"0 0 10px" }}>{mod.desc}</p>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                <button onClick={() => openTheory(mod)} style={S.btn(mod.color)}>📖 Teoría</button>
                <button onClick={() => openModule(mod)} style={S.btnO}>Ejercicios →</button>
              </div>
              <div style={{ background:"#0f0f1a", borderRadius:"4px", height:"4px", overflow:"hidden", marginTop:"10px" }}>
                <div style={{ background:mod.color, height:"100%", width:`${(done/total)*100}%`, transition:"width 0.3s" }} />
              </div>
            </div>
          );
        })}
        <div style={{ ...S.card, borderLeft:"3px solid #ef4444", opacity: completedCount >= totalExercises*0.6 ? 1 : 0.4, cursor: completedCount >= totalExercises*0.6 ? "pointer" : "default" }}
          onClick={() => completedCount >= totalExercises*0.6 && openExam()}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div><span style={{ fontSize:"18px", marginRight:"8px" }}>🎓</span><span style={{ fontWeight:700, fontSize:"15px" }}>Examen Final</span></div>
            {progress.examScore !== null && <Badge color="#22c55e">RENDIDO: {progress.examResults?.pct}%</Badge>}
          </div>
          <p style={{ color:"#666", fontSize:"13px", margin:"6px 0" }}>
            {completedCount >= totalExercises*0.6 ? "4 problemas que combinan todo." : `Completá al menos ${Math.ceil(totalExercises*0.6)} ejercicios para desbloquear (tenés ${completedCount})`}
          </p>
        </div>
      </div>
    );
  }

  // ============ THEORY VIEW ============
  if (view === "theory" && currentModule) {
    const theory = THEORY[currentModule.id];
    if (!theory) return <div style={S.page}><button onClick={() => setView("dashboard")} style={S.btnO}>← Dashboard</button><p>Teoría no disponible aún</p></div>;
    const sec = theory.sections[theorySection];
    return (
      <div style={S.page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
          <button onClick={() => openModule(currentModule)} style={S.btnO}>→ Ir a ejercicios</button>
          <button onClick={() => setView("dashboard")} style={S.btnO}>← Dashboard</button>
        </div>
        <h2 style={{ margin:"0 0 4px", color:currentModule.color, fontSize:"20px" }}>{currentModule.icon} {theory.title}</h2>
        <p style={{ color:"#666", fontSize:"13px", marginBottom:"16px" }}>Sección {theorySection+1} de {theory.sections.length}</p>

        <div style={{ ...S.card, borderLeft:`3px solid ${currentModule.color}` }}>
          <h3 style={{ margin:"0 0 12px", fontSize:"16px", color:"#fff" }}>{sec.title}</h3>
          <div style={{ fontSize:"14px", lineHeight:"1.7", color:"#ccc", whiteSpace:"pre-wrap" }}>{sec.content}</div>
          <CodeBlock code={sec.code} />
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"12px", flexWrap:"wrap", gap:"8px" }}>
          <button onClick={() => setTheorySection(Math.max(0, theorySection-1))} disabled={theorySection===0}
            style={{ ...S.btnO, opacity: theorySection===0 ? 0.3 : 1 }}>← Anterior</button>
          <span style={{ color:"#666", fontSize:"13px", alignSelf:"center" }}>{theorySection+1} / {theory.sections.length}</span>
          {theorySection < theory.sections.length - 1
            ? <button onClick={() => setTheorySection(theorySection+1)} style={S.btn(currentModule.color)}>Siguiente →</button>
            : <button onClick={() => openModule(currentModule)} style={S.btn("#22c55e")}>Ir a ejercicios →</button>
          }
        </div>
      </div>
    );
  }

  // ============ MODULE VIEW ============
  if (view === "module" && currentModule) {
    return (
      <div style={S.page}>
        <div style={{ display:"flex", gap:"8px", marginBottom:"16px", flexWrap:"wrap" }}>
          <button onClick={() => setView("dashboard")} style={S.btnO}>← Dashboard</button>
          <button onClick={() => openTheory(currentModule)} style={S.btn(currentModule.color)}>📖 Repasar teoría</button>
        </div>
        <h2 style={{ margin:"0 0 16px", color:currentModule.color }}>{currentModule.icon} {currentModule.name}</h2>
        {currentModule.exercises.map((ex, i) => (
          <div key={ex.id} style={{ ...S.card, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}
            onClick={() => openExercise(currentModule, i)}>
            <div>
              <span style={{ fontWeight:600 }}>{i+1}. {ex.title}</span>
              <span style={{ marginLeft:"8px" }}><DiffBadge level={ex.difficulty} /></span>
              <span style={{ color:"#666", fontSize:"12px", marginLeft:"8px" }}>{ex.points} pts</span>
            </div>
            {progress.completed[ex.id] ? <span style={{ color:"#22c55e", fontWeight:700 }}>✓</span> : <span style={{ color:"#444" }}>→</span>}
          </div>
        ))}
      </div>
    );
  }

  // ============ EXERCISE VIEW ============
  if (view === "exercise" && currentModule) {
    const ex = currentModule.exercises[currentExIdx];
    const isLast = currentExIdx === currentModule.exercises.length - 1;
    const isFirst = currentExIdx === 0;

    return (
      <div style={S.page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
          <button onClick={() => setView("module")} style={S.btnO}>← {currentModule.name}</button>
          <div style={{ display:"flex", gap:"8px" }}>
            {!isFirst && <button onClick={() => openExercise(currentModule, currentExIdx-1)} style={S.btnO}>←</button>}
            {!isLast && <button onClick={() => openExercise(currentModule, currentExIdx+1)} style={S.btnO}>→</button>}
          </div>
        </div>

        <div style={{ marginBottom:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
            <h3 style={{ margin:0, fontSize:"18px" }}>{ex.title}</h3>
            <DiffBadge level={ex.difficulty} />
            <span style={{ color:"#666", fontSize:"12px" }}>{ex.points} pts</span>
            {progress.completed[ex.id] && <Badge color="#22c55e">RESUELTO</Badge>}
          </div>
          <p style={{ color:"#ccc", fontSize:"14px", lineHeight:"1.6", margin:0 }}>{ex.desc}</p>
        </div>

        {/* Concept toggle */}
        <button onClick={() => setShowConcept(!showConcept)}
          style={{ ...S.btn(currentModule.color), marginBottom:"12px", fontSize:"12px", padding:"6px 12px" }}>
          📖 {showConcept ? "Ocultar concepto" : "¿Qué necesito saber?"}
        </button>
        {showConcept && (
          <div style={{ ...S.card, borderLeft:`3px solid ${currentModule.color}`, marginBottom:"12px" }}>
            <p style={{ margin:0, fontSize:"13px", lineHeight:"1.7", color:"#ccc" }}>{ex.concept}</p>
            <button onClick={() => openTheory(currentModule)} style={{ ...S.btnO, marginTop:"8px", fontSize:"11px", padding:"4px 10px" }}>
              📖 Ver teoría completa del módulo
            </button>
          </div>
        )}

        <CodeEditor value={code} onChange={(v) => { setCode(v); setTestResults(null); }} />

        <div style={{ display:"flex", gap:"8px", marginTop:"12px", flexWrap:"wrap" }}>
          <button onClick={handleRun} disabled={running} style={S.btn()}>{running ? "..." : "▶ Ejecutar Tests"}</button>
          {ex.hints && hintsShown < ex.hints.length && (
            <button onClick={() => setHintsShown(hintsShown+1)} style={S.btnO}>💡 Hint ({hintsShown}/{ex.hints.length})</button>
          )}
          <button onClick={() => { setCode(ex.starter); setTestResults(null); }} style={S.btnO}>↺ Reset</button>
        </div>

        {hintsShown > 0 && ex.hints && (
          <div style={{ ...S.card, marginTop:"12px", borderLeft:"3px solid #eab308" }}>
            {ex.hints.slice(0, hintsShown).map((h, i) => (
              <p key={i} style={{ margin: i===0 ? 0 : "8px 0 0", color:"#eab308", fontSize:"13px", fontFamily:"monospace" }}>💡 {h}</p>
            ))}
          </div>
        )}

        {testResults && (
          <div style={{ ...S.card, marginTop:"12px", borderLeft:`3px solid ${testResults.allPass ? "#22c55e" : "#ef4444"}` }}>
            {testResults.error
              ? <p style={{ color:"#ef4444", margin:0, fontFamily:"monospace", fontSize:"13px" }}>❌ Error: {testResults.error}</p>
              : <>
                  <p style={{ fontWeight:700, margin:"0 0 8px", color: testResults.allPass ? "#22c55e" : "#ef4444" }}>
                    {testResults.allPass ? "✅ ¡Todos los tests pasaron!" : "❌ Algunos tests fallaron"}
                    {testResults.allPass && !progress.completed[ex.id] && <span style={{ color:"#f97316", marginLeft:"8px" }}>+{ex.points} pts</span>}
                  </p>
                  {testResults.results.map((r, i) => (
                    <div key={i} style={{ padding:"6px 0", borderTop: i > 0 ? "1px solid #2a2a3e" : "none", fontSize:"13px", fontFamily:"monospace" }}>
                      <span style={{ color: r.pass ? "#22c55e" : "#ef4444" }}>{r.pass ? "✓" : "✗"}</span>{" "}
                      <span style={{ color:"#999" }}>{r.label}</span>
                      {!r.pass && r.expected !== "__CLOSURE_TEST__" && r.expected !== "__CUSTOM_ASYNC_TEST__" && (
                        <div style={{ color:"#ef4444", marginTop:"2px", paddingLeft:"16px" }}>
                          Esperado: <span style={{ color:"#eab308" }}>{JSON.stringify(r.expected)}</span> → Recibido: <span style={{ color:"#ef4444" }}>{typeof r.result === "string" ? r.result : JSON.stringify(r.result)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </>
            }
          </div>
        )}
      </div>
    );
  }

  // ============ EXAM ============
  if (view === "exam") {
    const q = EXAM_QUESTIONS[examIdx];
    const answered = Object.keys(examAnswers).length;
    return (
      <div style={S.page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
          <button onClick={() => setView("dashboard")} style={S.btnO}>← Salir</button>
          <span style={{ color:"#666", fontSize:"13px" }}>Pregunta {examIdx+1}/{EXAM_QUESTIONS.length} — Respondidas: {answered}</span>
        </div>
        <div style={{ marginBottom:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
            <h3 style={{ margin:0, color:"#ef4444" }}>🎓 {q.title}</h3>
            <Badge color="#ef4444">{q.points} pts</Badge>
            {examAnswers[q.id]?.pass && <Badge color="#22c55e">✓</Badge>}
          </div>
          <p style={{ color:"#ccc", fontSize:"14px", lineHeight:"1.6" }}>{q.desc}</p>
        </div>

        <button onClick={() => setShowConcept(!showConcept)} style={{ ...S.btn("#ef4444"), marginBottom:"12px", fontSize:"12px", padding:"6px 12px" }}>
          📖 {showConcept ? "Ocultar pista" : "¿Qué necesito saber?"}
        </button>
        {showConcept && q.concept && (
          <div style={{ ...S.card, borderLeft:"3px solid #ef4444", marginBottom:"12px" }}>
            <p style={{ margin:0, fontSize:"13px", color:"#ccc" }}>{q.concept}</p>
          </div>
        )}

        <CodeEditor value={code} onChange={(v) => { setCode(v); setTestResults(null); }} />
        <div style={{ display:"flex", gap:"8px", marginTop:"12px", flexWrap:"wrap" }}>
          <button onClick={handleRun} disabled={running} style={S.btn("#ef4444")}>{running ? "..." : "▶ Verificar"}</button>
          {q.hints && hintsShown < q.hints.length && <button onClick={() => setHintsShown(hintsShown+1)} style={S.btnO}>💡 Hint</button>}
          {examIdx > 0 && <button onClick={() => { setExamIdx(examIdx-1); setCode(examAnswers[EXAM_QUESTIONS[examIdx-1]?.id]?.code || EXAM_QUESTIONS[examIdx-1].starter); setTestResults(null); setHintsShown(0); setShowConcept(false); }} style={S.btnO}>←</button>}
          {examIdx < EXAM_QUESTIONS.length-1 && <button onClick={() => { setExamIdx(examIdx+1); setCode(examAnswers[EXAM_QUESTIONS[examIdx+1]?.id]?.code || EXAM_QUESTIONS[examIdx+1].starter); setTestResults(null); setHintsShown(0); setShowConcept(false); }} style={S.btnO}>→</button>}
          {answered > 0 && <button onClick={finishExam} style={S.btn("#22c55e")}>Finalizar ({answered}/{EXAM_QUESTIONS.length})</button>}
        </div>
        {hintsShown > 0 && q.hints && (
          <div style={{ ...S.card, marginTop:"12px", borderLeft:"3px solid #eab308" }}>
            {q.hints.slice(0, hintsShown).map((h, i) => <p key={i} style={{ margin: i===0?0:"8px 0 0", color:"#eab308", fontSize:"13px", fontFamily:"monospace" }}>💡 {h}</p>)}
          </div>
        )}
        {testResults && (
          <div style={{ ...S.card, marginTop:"12px", borderLeft:`3px solid ${testResults.allPass ? "#22c55e" : "#ef4444"}` }}>
            {testResults.error
              ? <p style={{ color:"#ef4444", margin:0, fontFamily:"monospace", fontSize:"13px" }}>❌ {testResults.error}</p>
              : <>
                  <p style={{ fontWeight:700, margin:"0 0 8px", color: testResults.allPass ? "#22c55e" : "#ef4444" }}>{testResults.allPass ? "✅ ¡Correcto!" : "❌ Revisá tu solución"}</p>
                  {testResults.results.map((r, i) => (
                    <div key={i} style={{ padding:"4px 0", fontSize:"13px", fontFamily:"monospace" }}>
                      <span style={{ color: r.pass ? "#22c55e" : "#ef4444" }}>{r.pass ? "✓" : "✗"} {r.label}</span>
                    </div>
                  ))}
                </>
            }
          </div>
        )}
      </div>
    );
  }

  // ============ EXAM RESULTS ============
  if (view === "examResults" && examResults) {
    const passed = examResults.pct >= 70;
    return (
      <div style={S.page}>
        <div style={{ ...S.card, textAlign:"center", padding:"32px", borderLeft:`3px solid ${passed ? "#22c55e" : "#ef4444"}` }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>{passed ? "🏆" : "📚"}</div>
          <h2 style={{ color: passed ? "#22c55e" : "#ef4444", margin:"0 0 8px" }}>{passed ? "¡Aprobado!" : "Seguí practicando"}</h2>
          <p style={{ fontSize:"32px", fontWeight:800, color:"#f97316", margin:"8px 0" }}>{examResults.pct}%</p>
          <p style={{ color:"#666" }}>{examResults.total} / {examResults.max} puntos</p>
          <div style={{ marginTop:"16px", textAlign:"left" }}>
            {EXAM_QUESTIONS.map(q => (
              <div key={q.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderTop:"1px solid #2a2a3e", fontSize:"13px" }}>
                <span>{q.title}</span>
                <span style={{ color: examResults.answers[q.id]?.pass ? "#22c55e" : "#ef4444" }}>{examResults.answers[q.id]?.pass ? `✓ ${q.points}` : "✗ 0"} pts</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"24px", display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setView("dashboard")} style={S.btn()}>Dashboard</button>
            <button onClick={openExam} style={S.btnO}>Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  return <div style={S.page}><button onClick={() => setView("dashboard")} style={S.btn()}>← Dashboard</button></div>;
}
