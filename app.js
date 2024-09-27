const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel');
const ModelSubject = require('./subjectModel');
const app = express();
const bcrypt = require('bcrypt');
const ModelStudent = require('./student');
const ModelGroup = require('./groupModel');
const ModelHorario = require('./horarioModel');

const cors = require('cors'); // Importa el paquete cors
const router = express.Router();



// Configura CORS
app.use(cors({
    origin: 'http://localhost:4200', // Permite solicitudes solo desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permite cookies
}));

app.use(express.json());

/**
 * APIS DE HORARIOS
 */

//CREAR
router.post('/horario/crear', async (req, res) => {
    try {
        const body = req.body; 
        const newGroup = await ModelHorario.create(body); 
        res.status(201).send(newGroup); 
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el grupo', error }); 
    }
});



//GET ALL
app.get('/horarios', async (req, res) => {
    try {
      const grupos = await ModelHorario.find();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




/*
    APIS DE GRUPOS
*/ 

//CREAR
router.post('/grupo/crear', async (req, res) => {
    try {
        const body = req.body; // Obtener el cuerpo de la solicitud
        const newGroup = await ModelGroup.create(body); // Crear el nuevo grupo
        res.status(201).send(newGroup); // Enviar la respuesta con el grupo creado
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el grupo', error }); // Manejo de errores
    }
});




//GET ALL
app.get('/grupos', async (req, res) => {
    try {
      const grupos = await ModelGroup.find();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


//GET BY PROFESSOR ID
router.get("/grupos/:id", async (req, res) => {
    const id = req.params.id; // Asegúrate de que sea `req.params.id`
    try {
        const respuesta = await ModelGroup.find({ profesor: id }); 
        res.send(respuesta);
    } catch (error) {
        console.error("Error al obtener grupos:", error);
        res.status(500).send("Error al obtener grupos");
    }
});










router.post("/student", async (req, res) => {
    const body =  req.body;
    const respuesta = await ModelStudent.create(body);
    res.send(respuesta);
});




//CRUD


//GET
router.get("/", (req, res) => {
    res.send("soy un get");
})
// CREAR USUARIO
// CREAR USUARIO
// CREAR USUARIO
// CREAR USUARIO
router.post("/create", async (req, res) => {
    try {
        const body = req.body;

        // Si horarioLaboral está vacío o no se proporciona, asignar valores por defecto
        if (!body.horarioLaboral || Object.keys(body.horarioLaboral).length === 0) {
            body.horarioLaboral = {
                Lunes: [{ horaInicio: "08:00", horaFin: "14:00" }],
                Martes: [{ horaInicio: "08:00", horaFin: "14:00" }],
                Miércoles: [{ horaInicio: "08:00", horaFin: "14:00" }],
                Jueves: [{ horaInicio: "08:00", horaFin: "14:00" }],
                Viernes: [{ horaInicio: "08:00", horaFin: "14:00" }]
            };
        }

        const respuesta = await ModelUser.create(body);
        res.status(201).send(respuesta);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send({
            message: 'Error al crear el usuario',
            error: error.message || error
        });
    }
});




//get user by id
router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id);
    res.send(respuesta);
});





//update teacher
router.put("/update/teacher/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({_id:id}, body);
    res.send(respuesta);
})



//find by id

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id);
    res.send(respuesta);
})

//update
router.put("/update/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({_id:id}, body);
    res.send(respuesta);
})

//Delete
router.delete("/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id:id});
    res.send(respuesta);
})

//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ModelUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la almacenada en texto plano
        if (user.password !== password) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Aquí puedes devolver un token JWT o datos del usuario
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});



/*
 
  APIS DE MATERIAS
  
*/

// CREATE
router.post('/materias/crear', async (req, res) => {
    try {
        const body = req.body; 
        const nuevaMateria = await ModelSubject.create(body); 
        res.status(201).send(nuevaMateria); 
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).send({
            message: 'Error al crear la materia',
            error: error.message || error
        }); 
    }
});



// GET ALL
app.get('/materias', async (req, res) => {
    try {
      const materias = await ModelSubject.find();
      res.json(materias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



//agregar materias para el profesor
app.put('/add/materias/:id', async (req, res) => {
    const { id } = req.params;
    const { profesores } = req.body; // Aquí esperamos que se envíe "profesores"

    try {
        const materia = await ModelSubject.findById(id);
        
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Verifica si el nuevo profesor ya está asignado
        if (materia.profesores.profesor1 === profesores || materia.profesores.profesor2 === profesores) {
            return res.status(400).json({ message: 'El profesor ya está asignado' });
        }

        // Si profesor1 es "no", asignar el nuevo profesor
        if (materia.profesores.profesor1 === "no") {
            materia.profesores.profesor1 = profesores;
        } 
        // Si profesor1 no es "no" y profesor2 es "no", asignar el nuevo profesor
        else if (materia.profesores.profesor2 === "no") {
            materia.profesores.profesor2 = profesores;
        } 
        // Si ambos profesores ya tienen valores
        else {
            return res.status(400).json({ message: 'Ambos profesores ya están asignados' });
        }

        const updatedMateria = await materia.save(); // Guardar los cambios

        res.json(updatedMateria); // Devuelve la materia actualizada
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//modifica user:profesor materias

app.put('/users/:id/materias', async (req, res) => {
    const { id } = req.params;
    const { materiaId, codigo } = req.body; // Asegúrate de obtener ambos valores

    try {
        const user = await ModelUser.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la materia ya está en el arreglo
        const existingMateria = user.materias.find(m => m.materiaId === materiaId);

        if (!existingMateria) {
            // Agregar nueva materia al array
            user.materias.push({ materiaId, codigo });
        } else {
            return res.status(400).json({ message: 'La materia ya está asignada a este usuario' });
        }

        const updatedUser = await user.save(); // Guardar cambios
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





//toro
router.get('/profesores/:id', async (req, res) => {
    try {
        const profesor = await ModelUser.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//todos los profesores

app.get('/profesores', async (req, res) => {
    try {
        const profesores = await ModelUser.find({ tipo: 'profesor' });
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






app.use(router);

app.listen(3001, () => {
    console.log("El servidor esta corriendi");
})

dbconnect();