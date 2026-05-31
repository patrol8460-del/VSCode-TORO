using Microsoft.AspNetCore.Mvc;
using TOIR.Core;
using TOIR.Core.Data;

namespace TOIR.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly AppDbContext _db;

        public EquipmentController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _db.Equipments.ToList();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _db.Equipments.FirstOrDefault(e => e.Id == id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Equipment updated)
        {
            var item = _db.Equipments.FirstOrDefault(e => e.Id == id);
            if (item == null) return NotFound();

            item.Naimenovanie_oborudovaniya = updated.Naimenovanie_oborudovaniya;
            item.Kolichestvo = updated.Kolichestvo;
            item.EI = updated.EI;
            item.Tip_model = updated.Tip_model;
            item.Chertezh = updated.Chertezh;
            item.Seriyniy_nomer = updated.Seriyniy_nomer;
            item.Klass = updated.Klass;
            item.Inventarniy_nomer_OS = updated.Inventarniy_nomer_OS;
            item.Nomer_TOPAZ = updated.Nomer_TOPAZ;
            item.Nomer_SAP_TORO = updated.Nomer_SAP_TORO;
            item.Kod_ABCD = updated.Kod_ABCD;
            item.MVZ = updated.MVZ;
            item.Izgotovitel = updated.Izgotovitel;
            item.Data_vypuska = updated.Data_vypuska;
            item.Data_vvoda_v_exspluataciyu = updated.Data_vvoda_v_exspluataciyu;
            item.Data_spisaniya = updated.Data_spisaniya;
            item.Vazhnost_dlya_tehnologicheskogo_processa = updated.Vazhnost_dlya_tehnologicheskogo_processa;
            item.Klyuchevoe = updated.Klyuchevoe;
            item.Ispytatelnoe = updated.Ispytatelnoe;
            item.Status_oborudovaniya = updated.Status_oborudovaniya;
            item.Vyshestoyaschaya_EO = updated.Vyshestoyaschaya_EO;
            item.Nalichie_rezerva = updated.Nalichie_rezerva;
            item.Ceh = updated.Ceh;
            item.Korpus = updated.Korpus;
            item.Proizvodstvenniy_uchastok = updated.Proizvodstvenniy_uchastok;
            item.Tehnologicheskiy_uchastok = updated.Tehnologicheskiy_uchastok;
            item.Nomer_pomesheniya = updated.Nomer_pomesheniya;
            item.Naimenovanie_pomesheniya = updated.Naimenovanie_pomesheniya;
            item.Mestopolozhenie = updated.Mestopolozhenie;
            item.Liniya_ustanovka_kompleks = updated.Liniya_ustanovka_kompleks;
            item.Vysotnaya_otmetka = updated.Vysotnaya_otmetka;
            item.Os_1_po_gorizontali = updated.Os_1_po_gorizontali;
            item.Os_2_po_gorizontali = updated.Os_2_po_gorizontali;
            item.Os_1_po_vertikali = updated.Os_1_po_vertikali;
            item.Os_2_po_vertikali = updated.Os_2_po_vertikali;
            item.Nomer_proekta = updated.Nomer_proekta;
            item.Poziciya_po_proekty = updated.Poziciya_po_proekty;
            item.Prolet = updated.Prolet;
            item.Etazh = updated.Etazh;
            item.Ceh_otvetstvenniy = updated.Ceh_otvetstvenniy;
            item.Sluzhba_glavnogo_specialista = updated.Sluzhba_glavnogo_specialista;
            item.Litso_otvetstvennoe_ispravnoe = updated.Litso_otvetstvennoe_ispravnoe;
            item.Litso_otvetstvennoe_bezopasnoe = updated.Litso_otvetstvennoe_bezopasnoe;
            item.Materialno_otvetstvennoe_litso = updated.Materialno_otvetstvennoe_litso;
            item.Periodichnost_TO_meh = updated.Periodichnost_TO_meh;
            item.Periodichnost_TR_meh = updated.Periodichnost_TR_meh;
            item.Periodichnost_KR_meh = updated.Periodichnost_KR_meh;
            item.Periodichnost_TO_el = updated.Periodichnost_TO_el;
            item.Periodichnost_TR_el = updated.Periodichnost_TR_el;
            item.Periodichnost_KR_el = updated.Periodichnost_KR_el;
            item.Periodichnost_TO_kip = updated.Periodichnost_TO_kip;
            item.Periodichnost_TR_kip = updated.Periodichnost_TR_kip;
            item.Periodichnost_TO_ASU = updated.Periodichnost_TO_ASU;
            item.Ispolnitel_TO_meh = updated.Ispolnitel_TO_meh;
            item.Ispolnitel_TR_meh = updated.Ispolnitel_TR_meh;
            item.Ispolnitel_KR_meh = updated.Ispolnitel_KR_meh;
            item.Ispolnitel_TO_el = updated.Ispolnitel_TO_el;
            item.Ispolnitel_TR_el = updated.Ispolnitel_TR_el;
            item.Ispolnitel_KR_el = updated.Ispolnitel_KR_el;
            item.Ispolnitel_TO_kip = updated.Ispolnitel_TO_kip;
            item.Ispolnitel_TR_kip = updated.Ispolnitel_TR_kip;
            item.Ispolnitel_TO_ASU = updated.Ispolnitel_TO_ASU;
            item.Remontoslozhnost_meh = updated.Remontoslozhnost_meh;
            item.Remontoslozhnost_el = updated.Remontoslozhnost_el;
            item.Remontoslozhnost_kip = updated.Remontoslozhnost_kip;
            item.Remontoslozhnost_ASUTP = updated.Remontoslozhnost_ASUTP;
            item.Data_nachala_cikla_remontov = updated.Data_nachala_cikla_remontov;
            item.Smennost = updated.Smennost;
            item.Koefficient_usloviy_truda = updated.Koefficient_usloviy_truda;
            item.Dop_remontniy_koefficient_DRK = updated.Dop_remontniy_koefficient_DRK;
            item.Data_posledney_poverki = updated.Data_posledney_poverki;
            item.Goden_do = updated.Goden_do;
            item.Yavlyaetsya_tehnicheskim_ustroystvom_OPO = updated.Yavlyaetsya_tehnicheskim_ustroystvom_OPO;
            item.Yavlyaetsya_tehnicheskim_ustroystvom_HOPO = updated.Yavlyaetsya_tehnicheskim_ustroystvom_HOPO;
            item.Yavlyaetsya_obektom_vazhnim_bezopasnosti = updated.Yavlyaetsya_obektom_vazhnim_bezopasnosti;
            item.Yavlyaetsya_yadernoy_ustanovkoy = updated.Yavlyaetsya_yadernoy_ustanovkoy;
            item.Normativniy_dokument_klassa_bezopasnosti = updated.Normativniy_dokument_klassa_bezopasnosti;
            item.Klass_bezopasnosti = updated.Klass_bezopasnosti;
            item.Klassifikacionnoe_oboznachenie = updated.Klassifikacionnoe_oboznachenie;
            item.Yavlyaetsya_obektom_ohrany_okruzhayuschey_sredy = updated.Yavlyaetsya_obektom_ohrany_okruzhayuschey_sredy;
            item.Yavlyaetsya_obektom_protivopozharnoy_zaschity = updated.Yavlyaetsya_obektom_protivopozharnoy_zaschity;
            item.Nadzorniy_organ_vneshniy = updated.Nadzorniy_organ_vneshniy;
            item.Nadzorniy_organ_vnutrenniy = updated.Nadzorniy_organ_vnutrenniy;
            item.Registracionniy_nomer = updated.Registracionniy_nomer;
            item.Srok_sluzhby_let = updated.Srok_sluzhby_let;
            item.Data_istecheniya_sroka_sluzhby = updated.Data_istecheniya_sroka_sluzhby;

            _db.SaveChanges();
            return Ok(item);
        }
    }
}