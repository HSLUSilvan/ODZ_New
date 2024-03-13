using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ODZ_BackEnd.Models;
using System.Linq;

namespace ODZ_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrganController : Controller
    {
        private readonly OrganDbContext organContext;
        public OrganController(OrganDbContext context)
        {
            this.organContext = context;
        }

        [HttpGet]
        [ActionName("GetAllOrgans")]
        [Route("AllOrgans")]
        public async Task<IActionResult> GetAllOrgans()
        {
            var organs = await organContext.Massnahme
                .Include(x => x.OrgelNavigation)
                .Include(x => x.OrtNavigation)
                 .ThenInclude(x => x.KantonNavigation)
                .Include(x => x.Kontakts).Where(x => x.Kontakts.Any(x => x.Istorgelbauer == 1))
               .Include(x => x.MassnahmedatumNavigation)
               .Where(x => x.MassnahmedatumNavigation.Id == x.Massnahmedatum)
               .Select(x =>
                           new
                           {
                               x.Id,
                               x.Massnahme1,
                               x.MassnahmedatumNavigation.Bezeichnung,
                               x.OrgelNavigation.Gebaeude,
                               x.OrtNavigation.Plz,
                               x.OrtNavigation.Name,
                               kantonName = x.OrtNavigation.KantonNavigation.Name,
                               kontakts = x.Kontakts.Select(x => new
                               {
                                   x.Name,
                                   x.Vorname,
                                   x.Synonyme
                               })

                           }
                           )
                .ToListAsync();


            return Ok(organs);
        }

        [HttpGet]
        [ActionName("GetMapOrgans")]
        [Route("MapOrgans")]
        public async Task<IActionResult> GetMapOrgans()
        {
            var organs = await organContext.Massnahme
               .Include(x => x.OrgelNavigation).Where(x => x.Istsichtbar == 1)
               .Where(x => x.MassnahmedatumNavigation.Id == x.Massnahmedatum &&
                 x.Massnahme1 == "Neubau" ||
                 x.Massnahme1 == "Construction" ||
                 x.Massnahme1 == "Costruzione" ||
                 x.Massnahme1 == "Rekonstruktion" ||
                 x.Massnahme1 == "Réconstruction" ||
                 x.Massnahme1 == "Ricostruzione" ||
                 x.Massnahme1 == "Restaurierung" ||
                 x.Massnahme1 == "Restauration" ||
                 x.Massnahme1 == "Restauro" &&
                 x.Istsichtbar == 1 &&
                 x.OrgelNavigation.Istsichbar == 1 &&
                 x.MassnahmedatumNavigation.Id != -1 &&
                 x.MassnahmedatumNavigation.Bezeichnung != "?" &&
                 x.MassnahmedatumNavigation.Bezeichnung != "??" &&
                 x.MassnahmedatumNavigation.Bezeichnung != "???")
                 .Include(x => x.OrgelNavigation).Where(x => x.OrgelNavigation.Istsichbar == 1)
                .Include(x => x.OrtNavigation)
                 .ThenInclude(x => x.KantonNavigation)
                .Include(x => x.Kontakts).Where(x => x.Kontakts.Any(x => x.Istorgelbauer == 1))
               .Select(x =>
                           new
                           {
                               x.Id,
                               x.OrgelNavigation.Latitude,
                               x.OrgelNavigation.Longitude,
                               x.OrgelNavigation.Gebaeude,
                               x.OrgelNavigation.Gebaeudeteil,
                               x.OrtNavigation.Plz,
                               x.OrtNavigation.Name,
                               kantonName = x.OrtNavigation.KantonNavigation.Name,

                           }
                           )
                .ToListAsync();


            return Ok(organs);
        }

        [HttpGet]
        [ActionName("GetOrgans")]
        [Route("Organs")]
        public async Task<IActionResult> GetOrgans()
        {
            var organs = await organContext.Massnahme
                 .Include(x => x.OrgelNavigation).Where(x => x.Istsichtbar == 1 && x.OrgelNavigation.Istsichbar == 1)
                 .Include(x => x.OrtNavigation)
                 .ThenInclude(x => x.KantonNavigation)
                 .Include(x => x.Kontakts).Where(x => x.Kontakts.Any(x => x.Istorgelbauer == 1))
                .Include(x => x.MassnahmedatumNavigation)
                .Where(x => x.MassnahmedatumNavigation.Id == x.Massnahmedatum &&
                 x.Massnahme1 == "Neubau" ||
                 x.Massnahme1 == "Construction" ||
                 x.Massnahme1 == "Costruzione" ||
                 x.Massnahme1 == "Rekonstruktion" ||
                 x.Massnahme1 == "Réconstruction" ||
                 x.Massnahme1 == "Ricostruzione" ||
                 x.Massnahme1 == "Restaurierung" ||
                 x.Massnahme1 == "Restauration" ||
                 x.Massnahme1 == "Restauro" &&
                 x.Istsichtbar == 1 &&
                 x.OrgelNavigation.Istsichbar == 1 &&
                 x.MassnahmedatumNavigation.Id != -1 &&
                 x.MassnahmedatumNavigation.Bezeichnung != "?" &&
                 x.MassnahmedatumNavigation.Bezeichnung != "??" &&
                 x.MassnahmedatumNavigation.Bezeichnung != "???")
                .Select(x =>
                           new
                           {
                               x.Id,
                               x.Massnahme1,
                               orgelbezeichnung = x.OrgelNavigation.Bezeichnung,
                               x.MassnahmedatumNavigation.Bezeichnung,
                               datum = x.MassnahmedatumNavigation.Datum1.ToString("dd.MM.yyyy"),
                               x.OrgelNavigation.Gebaeude,
                               orgelId = x.OrgelNavigation.Id,
                               x.OrtNavigation.Plz,
                               x.OrtNavigation.Name,
                               kantonName = x.OrtNavigation.KantonNavigation.Name,
                               kontakts = x.Kontakts.Select(x => new
                               {
                                   x.Name,
                                   x.Vorname,
                                   x.Synonyme
                               })

                           }
                            )
                 .ToListAsync();


            return Ok(organs);
        }

        [HttpGet]
        [Route("Medium/{id:int}")]
        [ActionName("GetMedien")]
        public FileResult GetPhoto(int id)
        {
            var media = organContext.Media
                .Include(x => x.MediumtypNavigation)
                .FirstOrDefault(x => x.Id == id);
            return File(media.Daten, "image/" + media.MediumtypNavigation.Dateiendung);
        }

        [HttpPost]
        [Route("Medium/Add")]
        [ActionName("AddMedien")]
        public async Task<IActionResult> AddPhoto([FromBody] Medium mediaObj)
        {
            if (mediaObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Media.Add(mediaObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Media added successfully."
                });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetOrgan")]
        public async Task<IActionResult> GetOrgan([FromRoute] int id)
        {
            var organs = await organContext.Orgel.FirstOrDefaultAsync(x => x.Id == id);
            if (organContext != null)
            {
                return Ok(organs);
            }

            return NotFound("Card not Found");

        }

        [HttpGet]
        [Route("Entry/{id:int}")]
        [ActionName("GetEntry")]
        public async Task<IActionResult> GetOrganDetails([FromRoute] int id)
        {
            var organs = organContext.Massnahme
                .Include(x => x.OrgelNavigation)
                .Where(x => x.Id == id)
                .Include(x => x.OrtNavigation)
                    .ThenInclude(x => x.LandNavigation)
                    .Where(x => x.OrtNavigation.LandNavigation.Id == x.OrtNavigation.Land)
                .Where(x => x.OrtNavigation.Id == x.Ort)
                .Include(x => x.OrtNavigation)
                    .ThenInclude(x => x.KantonNavigation)
                    .Where(x => x.OrtNavigation.KantonNavigation.Id == x.OrtNavigation.Kanton)
                .Where(x => x.OrtNavigation.Id == x.Ort)
                .Include(x => x.MassnahmedatumNavigation)
                .Where(x => x.MassnahmedatumNavigation.Id == x.Massnahmedatum)
                .Include(x => x.Kontakts)
                .Include(x => x.Tastenreihes)
                .ThenInclude(l => l.Werks)
                .ThenInclude(l => l.Ladens)
                .ThenInclude(l => l.Registers)
                .Include(x => x.LiteraturMassnahmes)
                .ThenInclude(x => x.LiteraturNavigation)
                .Include(x => x.Media)
                .ThenInclude(x => x.MediumtypNavigation)
                .FirstOrDefault();
                
            if (organContext != null)
            {
                return Ok(organs);
            }

            return NotFound("Organ not Found");

        }

        [HttpGet]
        [Route("Dispo/{id:int}")]
        [ActionName("GetDispo")]
        public async Task<IActionResult> GetOrganDispo([FromRoute] int id)
        {

            int orgelNummer = (int)organContext.Massnahme
                .Where(x => x.Id == id)
                .Select(x => x.Orgel).FirstOrDefault();

            var organs = organContext.Massnahme
                .Where(x => x.Massnahme1 != "vorschlag" &&
                x.Massnahme1 != "voranschlag" &&
                x.Massnahme1 != "offerte" &&
                x.Massnahme1 != "projekt" &&
                x.Massnahme1 != "proposition" &&
                x.Massnahme1 != "devis" &&
                x.Massnahme1 != "projet" &&
                x.Massnahme1 != "projetto" &&
                x.Massnahme1 != "preventivo" &&
                x.Massnahme1 != "anfrage" &&
                x.Massnahme1 != "Bauvertrag" &&
                x.Orgel == orgelNummer &&
                x.Tastenreihes.Any(x => x.Name != null || x.Name != "")
                )
                .Select(x =>
                           new
                           {
                               x.Id,
                               x.Massnahme1,
                               x.MassnahmedatumNavigation.Datum1.Year
                           }
                           )
                .ToList();
            if (organContext != null)
            {
                return Ok(organs);
            }

            return NotFound("Organ not Found");

        }

        [HttpGet]
        [Route("History/{id:int}")]
        [ActionName("GetHistory")]
        public async Task<IActionResult> GetOrganHistory([FromRoute] int id)
        {
            int orgelNummer = (int)organContext.Massnahme
                .Where(x => x.Id == id)
                .Select(x => x.Orgel).FirstOrDefault();

            var organs = organContext.Massnahme
                .Include(x => x.OrgelNavigation)
                .Include(x => x.MassnahmedatumNavigation)
                .Include(x => x.OrtNavigation)
                .Where(x => x.OrtNavigation.Id == x.Ort)
                .Where(x => x.Orgel == orgelNummer &&
                x.MassnahmedatumNavigation.Id != -1 &&
                x.MassnahmedatumNavigation.Bezeichnung != "?" &&
                x.MassnahmedatumNavigation.Bezeichnung != "??" &&
                x.MassnahmedatumNavigation.Bezeichnung != "???"
                )
                .Select(x =>
                new
                {
                    massnahmedatum = x.MassnahmedatumNavigation.Datum1,
                    x.Id,
                    x.Massnahme1,
                    x.Kontakts
                }
                           )
                .ToList()
                .OrderBy(x => x.massnahmedatum);
            if (organContext != null)
            {
                return Ok(organs);
            }

            return NotFound("Organ not Found");

        }

        [HttpPost]
        [ActionName("AddOrgel")]
        [Route("EditOrgel")]
        public async Task<IActionResult> AddOrgan([FromBody] Orgel organObj)
        {
            if (organObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Orgel.Add(organObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Orgel added successfully."
                });
            }
        }

        [HttpPut]
        [ActionName("UpdateOrgel")]
        [Route("EditOrgel")]
        public async Task<IActionResult> UpdateOrgan([FromBody] Orgel organObj)
        {
            if(organObj == null)
            {
                return BadRequest();
            }
            var orgel = organContext.Orgel.AsNoTracking().FirstOrDefault(x => x.Id == organObj.Id);
            if(orgel == null)
            {
                return NotFound(new
                {
                    Statuscode = 404,
                    Message = "Orgel not found"
                });
            }
            else
            {
                organContext.Entry(organObj).State = EntityState.Modified;
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Orgel updated successfully."
                });
            }
        }
        [HttpPost]
        [ActionName("AddKontakt")]
        [Route("EditKontakt")]
        public async Task<IActionResult> AddKontakt([FromBody] Kontakt kontaktObj)
        {
            if (kontaktObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Kontakt.Add(kontaktObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Kontakt added successfully."
                });
            }
        }

        [HttpPut]
        [ActionName("UpdateKontakt")]
        [Route("EditKontakt")]
        public async Task<IActionResult> UpdateKontakt([FromBody] Kontakt kontaktObj)
        {
            if (kontaktObj == null)
            {
                return BadRequest();
            }
            var orgel = organContext.Kontakt.AsNoTracking().FirstOrDefault(x => x.Id == kontaktObj.Id);
            if (orgel == null)
            {
                return NotFound(new
                {
                    Statuscode = 404,
                    Message = "Kontakt not found"
                });
            }
            else
            {
                organContext.Entry(kontaktObj).State = EntityState.Modified;
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Kontakt updated successfully."
                });
            }
        }

        [HttpPost]
        [ActionName("AddOrt")]
        [Route("EditOrt")]
        public async Task<IActionResult> AddOrt([FromBody] Ort ortObj)
        {
            if (ortObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Ort.Add(ortObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Ort added successfully."
                });
            }
        }

        [HttpPut]
        [ActionName("UpdateOrt")]
        [Route("EditOrt")]
        public async Task<IActionResult> UpdateOrt([FromBody] Ort ortObj)
        {
            if (ortObj == null)
            {
                return BadRequest();
            }
            var orgel = organContext.Ort.AsNoTracking().FirstOrDefault(x => x.Id == ortObj.Id);
            if (orgel == null)
            {
                return NotFound(new
                {
                    Statuscode = 404,
                    Message = "Ort not found"
                });
            }
            else
            {
                organContext.Entry(ortObj).State = EntityState.Modified;
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Ort updated successfully."
                });
            }
        }

        [HttpPost]
        [ActionName("AddDatum")]
        [Route("EditDatum")]
        public async Task<IActionResult> AddDatum([FromBody] Datum datumObj)
        {
            if (datumObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Data.Add(datumObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Datum added successfully."
                });
            }
        }

        [HttpPut]
        [ActionName("UpdateDatum")]
        [Route("EditDatum")]
        public async Task<IActionResult> UpdateDatum([FromBody] Datum datumObj)
        {
            if (datumObj == null)
            {
                return BadRequest();
            }
            var orgel = organContext.Data.AsNoTracking().FirstOrDefault(x => x.Id == datumObj.Id);
            if (orgel == null)
            {
                return NotFound(new
                {
                    Statuscode = 404,
                    Message = "Datum not found"
                });
            }
            else
            {
                organContext.Entry(datumObj).State = EntityState.Modified;
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Datum updated successfully."
                });
            }
        }




        [HttpGet]
        [Route("Edit/{id:int}")]
        [ActionName("GetEditOrgel")]
        public async Task<IActionResult> GetOrganEdit([FromRoute] int id)
        {
            var organs = organContext.Orgel
                .Where(x => x.Id == id)
                .FirstOrDefault();

            if (organContext != null)
            {
                return Ok(organs);
            }

            return NotFound("Organ not Found");

        }

        [HttpGet]
        [Route("Edit/Datuminfo")]
        [ActionName("GetDatumInfo")]
        public async Task<IActionResult> GetDatumInfo()
        {
            var organs = organContext.Data

               .Select(x =>
                new
                {
                    x.Id,
                    x.Bezeichnung,
                    datum = x.Datum1.ToString("dd.MM.yyyy")
                }
                )
                .ToList();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Organ not Found");
        }

        [HttpGet]
        [Route("Edit/Ortinfo")]
        [ActionName("GetOrtInfo")]
        public async Task<IActionResult> GetOrtInfo()
        {
            var organs = organContext.Ort
                .Include(x => x.KantonNavigation)
                .Select(x =>
                new
                {
                    x.Id,
                    x.Name,
                    x.Plz,
                    Kanton = x.KantonNavigation.Name
                }
                )
                .ToList();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Ort not Found");
        }

        [HttpGet]
        [Route("Edit/Kontaktinfo")]
        [ActionName("GetKontaktInfo")]
        public async Task<IActionResult> GetKontaktInfo()
        {
            var organs = await organContext.Kontakt

                .ToListAsync();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Kanton not Found");
        }


        [HttpGet]
        [Route("Edit/Kantoninfo")]
        [ActionName("GetKantontInfo")]
        public async Task<IActionResult> GetKantoninfo()
        {
            var organs = await organContext.Kanton

                .ToListAsync();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Kanton not Found");
        }

        [HttpGet]
        [Route("Edit/Landinfo")]
        [ActionName("GetLandtInfo")]
        public async Task<IActionResult> GetLandinfo()
        {
            var organs = await organContext.Land

                .ToListAsync();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Land not Found");
        }

        [HttpGet]
        [Route("Edit/Benutzerinfo")]
        [ActionName("GetBenutzerInfo")]
        public async Task<IActionResult> GetBenutzerinfo()
        {
            var organs = await organContext.Benutzer

                .ToListAsync();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Benutzer not Found");
        }

        [HttpPost]
        [ActionName("AddTastenreihe")]
        [Route("EditTastenreihe")]
        public async Task<IActionResult> AddTastenreihe([FromBody] Tastenreihe organObj)
        {
            if (organObj == null)
            {
                return BadRequest();
            }
            else
            {
                organContext.Tastenreihe.Add(organObj);
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Tastenreihe added successfully."
                });
            }
        }

        [HttpPut]
        [ActionName("UpdateTastenreihe")]
        [Route("EditTastenreihe")]
        public async Task<IActionResult> UpdateTastenreihe([FromBody] Tastenreihe organObj)
        {
            if (organObj == null)
            {
                return BadRequest();
            }
            var orgel = organContext.Tastenreihe.AsNoTracking().FirstOrDefault(x => x.Id == organObj.Id);
            if (orgel == null)
            {
                return NotFound(new
                {
                    Statuscode = 404,
                    Message = "Tastenreihe not found"
                });
            }
            else
            {
                organContext.Entry(organObj).State = EntityState.Modified;
                organContext.SaveChanges();
                return Ok(new
                {
                    Statuscode = 200,
                    Message = "Orgel updated successfully."
                });
            }
        }

        [HttpGet]
        [Route("Edit/Massnahmelist")]
        [ActionName("GetMassnahmeList")]
        public async Task<IActionResult> GetMediaMapping()
        {
            var organs = organContext.Massnahme
                .Select(x =>
                new
                {
                    x.Id,
                    x.Kommentar,
                    x.OrgelNavigation.Bezeichnung,
                    x.OrgelNavigation.Gemeinde,
                    x.OrgelNavigation.Gebaeude,
                }
                )
                .ToList();
            if (organContext != null)
            {
                return Ok(organs);
            }
            return NotFound("Ort not Found");
        }
    } 
}
