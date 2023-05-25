import chai from "chai";
import mongoose, { get } from "mongoose";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
describe("Pruebas con supertest", () => {
  const petMock = {
    name: " peludo",
    specie: "loro",
    birthDate: "12-30-2020",
  };
  const petMock1 = {
    name: " peludo",
    specie: "loro",
    birthDate: "12-30-2020",
  };
    describe('Pruebas iniciales para las mascotas',()=>{
        it('Pruebas de la consulta de mascotas /api/pets del statusCode',async()=>{
            const response = await requester.get("/api/pets")
             //console.log(response)
             expect(response.statusCode).to.equal(404)
        })
             it('Pruebas de la consulta de mascotas /api/pets identificando el valor del status',async()=>{
            const response = await requester.get("/api/pets")
            expect(response).to.have.property('status')
        })
        it('Pruebas del endpoint cons POST',async()=>{
             //console.log(response)
           
            const{ statusCode,ok,_body}= await requester.post('/api/pets').send(petMock)
            expect(statusCode).to.equal(200)
            expect(ok).to.be.true
            expect(_body.payload).to.have.property('adopted').to.be.false
        })
        it('Pruebas del endpoint con POST para un name',async()=>{
            //console.log(response)
           const{ statusCode,ok,_body}= await requester.post('/api/pets').send(petMock1)
          // expect(statusCode).to.equal(400)
        })
        it('Pruebas del endpoint con PUT para un name',async()=>{
            const crearPet=  await requester.post('/api/pets').send(petMock)
            const pet={
                name:'Nuevo Nombre',
                specie: 'loro',
                birthDate: '12-30-2020'
            }
            //console.log(response)
            const response =await requester.put(`/api/pets/${crearPet._body.payload._id}`).send(pet)
          
          // expect(statusCode).to.equal(400)
        })
    })
/*
  describe("Validar el login y el register", () => {
    
    let coookie;

    before(function () {
      mongoose.connect(
        "mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/?retryWrites=true&w=majority"
      );
    });
    beforeEach(function () {
      mongoose.connection.collection("users").deleteMany({});
    });
    after(function () {
      mongoose.connection.close();
      //this.timeout(5000)
    });

    it("Conejillo", async () => {
      await mongoose.connection.collection("user").deleteMany({});
      const { statusCode, ok, _body } = await requester
        .post("/api/sessions/register")
        .send(mockUser);
      //console.log(_body)
    });

    it("Probar nuestro registro en bd ---> reload", async () => {
      await mongoose.connection.collection("user").deleteMany({});
      const mockUser = {
        first_name: "coder",
        last_name: "house",
        email: "correo@correo.com",
        password: "DatosPrueba",
      };
      const { statusCode, ok, _body } = await requester
        .post("/api/sessions/register")
        .send(mockUser);
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(_body.payload).to.be.ok;
    });

    it("Probar nuestro login", async () => {
        const mockUser = {
            email: "correo@correo.com",
            password: "DatosPrueba",
          };
      const result = await requester.post("/api/sessions/login").send({
        email: mockUser.email,
        password: mockUser.password,
      });
      console.log(result._body);
     /*
      const split = result.headers['set-cookie'][1]
      coookie={
        name: split[0],
        token: split[1]
      }     
      expect(coookie.name).to.be.ok.and.equal("coderCookie")

    });


  });*/

  describe("Validacion de la mascota cuando se adjuna una imagen ", () => {
    it('Crear mascota con imagen',async()=>{
        const result =await requester.post("/api/pets/withimage")
        .field("name",petMock.name)
        .field("specie",petMock.specie)
        .field("birthDate",petMock.birthDate)
        .attach("image","./test/image.jpg")
      //  console.log(result)
        expect(result._body.payload.image).to.be.ok
    })
  });

});
