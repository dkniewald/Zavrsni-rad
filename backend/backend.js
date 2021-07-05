const express = require("express");
const app = express();
const pool = require("./index.js")

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   if ('OPTIONS' == req.method) {
      res.sendStatus(200);
   } else {
      next();
   }
});

app.use(express.json());

app.get("/updates", async (req, res) => {
   try {
      const updateList = await pool.query("select id, created, base_version, target_version from update");

      var result = [];
      for(const elem of updateList.rows)  {
         const baseVersion = await pool.query("SELECT software.code from software where id = " + elem.base_version)
         const targetVersion = await pool.query("SELECT software.code from software where id = " + elem.target_version)
         var pom = {
            "id": elem.id,
            "created": elem.created,
            "baseVersion": baseVersion.rows[0].code,
            "targetVersion": targetVersion.rows[0].code
         }
         result.push(pom)
      }

      var responseUpdateList = {
         "updates": result
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(responseUpdateList);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/updateInfo/:id", async (req, res) => {
   const {
      id
   } = req.params;
   try {
      const deviceName = await pool.query("SELECT device_type.name from update INNER JOIN device_sw_version ON update.id = device_sw_version.update INNER JOIN device on device_sw_version.device = device.id INNER JOIN device_type ON device.device_type = device_type.id WHERE update.id = " + req.params.id + " group by device_type.name")
      const updateInfo = await pool.query("SELECT update.id,update.started, update.status, count(update_capsules.update_delta) from update INNER JOIN update_capsules ON update.id = update_capsules.update_delta WHERE update.id = " + req.params.id + " GROUP BY (update.id)")
      const baseVersion = await pool.query("SELECT software.code from update INNER JOIN software on update.base_version = software.id WHERE update.id = " + req.params.id + "")
      const targetVersion = await pool.query("SELECT software.code from update INNER JOIN software on update.target_version = software.id WHERE update.id = " + req.params.id + "")
      const numberOfDevices = await pool.query("SELECT count(*) from update_devices WHERE update = " + req.params.id)
      var responseName;

      if (deviceName.rowCount == 0) {
         responseTeam = {
            "status": "Not Found",
            "message": "Update sa zadanim id-em ne postoji",
            "response": null
         }
         res.status(404);
      } else {
         var responseTeam = {
               "id": updateInfo.rows[0].id,
               "started": updateInfo.rows[0].started,
               "status": updateInfo.rows[0].status,
               "capsules": updateInfo.rows[0].count,
               "baseVersion": baseVersion.rows[0].code,
               "targetVersion": targetVersion.rows[0].code,
               "deviceName": deviceName.rows[0].name,
               "numberOfDevices": numberOfDevices.rows[0].count
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(responseTeam);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.get("/softwares", async (req, res) => {
   try {
      const softwareList = await pool.query("select id, code from software");

      var result = [];
      for(const elem of softwareList.rows)  {
         const numOfDev = await pool.query("select count(*) from device_sw_version where version =" + elem.id);
         var pom = {
            "id": elem.id,
            "code": elem.code,
            "numberOfDevices": numOfDev.rows[0].count
         }
         result.push(pom)
      }

      var responseSoftwareList = {
         "softwares": result
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(responseSoftwareList);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use((req, response, next) => {
   response.status(501)
   response.json({
      status: 'Nije implemntirano',
      message: 'Nije implementirana metoda za zadani zahtjev',
      response: null
   });
});

app.listen(3001);