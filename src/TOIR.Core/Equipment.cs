
using System;
using System.ComponentModel.DataAnnotations;

namespace TOIR.Core
{
    public class Equipment
    {
        public int Id { get; set; }

        // === Основное ===
        [Display(Name = "Наименование оборудования", GroupName = "Основное")]
        public string? Naimenovanie_oborudovaniya { get; set; }

        [Display(Name = "Количество", GroupName = "Основное")]
        public double Kolichestvo { get; set; }

        [Display(Name = "ЕИ", GroupName = "Основное")]
        public string? EI { get; set; }

        [Display(Name = "Тип/модель", GroupName = "Основное")]
        public string? Tip_model { get; set; }

        [Display(Name = "Чертеж", GroupName = "Основное")]
        public string? Chertezh { get; set; }

        [Display(Name = "Серийный номер", GroupName = "Основное")]
        public string? Seriyniy_nomer { get; set; }

        [Display(Name = "Класс", GroupName = "Основное")]
        public string? Klass { get; set; }

        [Display(Name = "Инвентарный номер ОС", GroupName = "Основное")]
        public long Inventarniy_nomer_OS { get; set; }

        [Display(Name = "Номер ТОПАЗ", GroupName = "Основное")]
        public string? Nomer_TOPAZ { get; set; }

        [Display(Name = "Номер SAP TORO", GroupName = "Основное")]
        public long Nomer_SAP_TORO { get; set; }

        [Display(Name = "Код ABCD", GroupName = "Основное")]
        public string? Kod_ABCD { get; set; }

        [Display(Name = "МВЗ", GroupName = "Основное")]
        public string? MVZ { get; set; }

        // === Производство ===
        [Display(Name = "Изготовитель", GroupName = "Производство")]
        public string? Izgotovitel { get; set; }

        [Display(Name = "Дата выпуска", GroupName = "Производство")]
        public DateTime? Data_vypuska { get; set; }

        [Display(Name = "Дата ввода в эксплуатацию", GroupName = "Производство")]
        public DateTime? Data_vvoda_v_exspluataciyu { get; set; }

        [Display(Name = "Дата списания", GroupName = "Производство")]
        public DateTime? Data_spisaniya { get; set; }

        [Display(Name = "Важность для технологического процесса", GroupName = "Производство")]
        public string? Vazhnost_dlya_tehnologicheskogo_processa { get; set; }

        [Display(Name = "Ключевое", GroupName = "Производство")]
        public bool Klyuchevoe { get; set; }

        [Display(Name = "Испытательное", GroupName = "Производство")]
        public bool Ispytatelnoe { get; set; }

        [Display(Name = "Статус оборудования", GroupName = "Производство")]
        public string? Status_oborudovaniya { get; set; }

        [Display(Name = "Вышестоящая ЕО", GroupName = "Производство")]
        public int? Vyshestoyaschaya_EO { get; set; }

        [Display(Name = "Наличие резерва", GroupName = "Производство")]
        public bool Nalichie_rezerva { get; set; }

        // === Местоположение ===
        [Display(Name = "Цех", GroupName = "Местоположение")]
        public string? Ceh { get; set; }

        [Display(Name = "Корпус", GroupName = "Местоположение")]
        public string? Korpus { get; set; }

        [Display(Name = "Производственный участок", GroupName = "Местоположение")]
        public string? Proizvodstvenniy_uchastok { get; set; }

        [Display(Name = "Технологический участок", GroupName = "Местоположение")]
        public string? Tehnologicheskiy_uchastok { get; set; }

        [Display(Name = "№ помещения", GroupName = "Местоположение")]
        public string? Nomer_pomesheniya { get; set; }

        [Display(Name = "Наименование помещения", GroupName = "Местоположение")]
        public string? Naimenovanie_pomesheniya { get; set; }

        [Display(Name = "Местоположение", GroupName = "Местоположение")]
        public string? Mestopolozhenie { get; set; }

        [Display(Name = "Линия/установка/комплекс", GroupName = "Местоположение")]
        public string? Liniya_ustanovka_kompleks { get; set; }

        [Display(Name = "Высотная отметка", GroupName = "Местоположение")]
        public double? Vysotnaya_otmetka { get; set; }

        [Display(Name = "Ось 1 по горизонтали", GroupName = "Местоположение")]
        public string? Os_1_po_gorizontali { get; set; }

        [Display(Name = "Ось 2 по горизонтали", GroupName = "Местоположение")]
        public string? Os_2_po_gorizontali { get; set; }

        [Display(Name = "Ось 1 по вертикали", GroupName = "Местоположение")]
        public string? Os_1_po_vertikali { get; set; }

        [Display(Name = "Ось 2 по вертикали", GroupName = "Местоположение")]
        public string? Os_2_po_vertikali { get; set; }

        [Display(Name = "№ проекта", GroupName = "Местоположение")]
        public string? Nomer_proekta { get; set; }

        [Display(Name = "Позиция по проекту", GroupName = "Местоположение")]
        public string? Poziciya_po_proekty { get; set; }

        [Display(Name = "Пролет", GroupName = "Местоположение")]
        public string? Prolet { get; set; }

        [Display(Name = "Этаж", GroupName = "Местоположение")]
        public string? Etazh { get; set; }

        // === Ответственные ===
        [Display(Name = "Цех, ответственный за исправное техническое состояние", GroupName = "Ответственные")]
        public string? Ceh_otvetstvenniy { get; set; }

        [Display(Name = "Служба главного специалиста, ответственная за исправное состояние", GroupName = "Ответственные")]
        public string? Sluzhba_glavnogo_specialista { get; set; }

        [Display(Name = "Лицо, ответственное за исправное состояние", GroupName = "Ответственные")]
        public string? Litso_otvetstvennoe_ispravnoe { get; set; }

        [Display(Name = "Лицо, ответственное за безопасную эксплуатацию", GroupName = "Ответственные")]
        public string? Litso_otvetstvennoe_bezopasnoe { get; set; }

        [Display(Name = "Материально-ответственное лицо", GroupName = "Ответственные")]
        public string? Materialno_otvetstvennoe_litso { get; set; }

        // === Планирование ===
        [Display(Name = "Периодичность ТО мех (раз в Х месяцев)", GroupName = "Планирование")]
        public double? Periodichnost_TO_meh { get; set; }

        [Display(Name = "Периодичность ТР мех (раз в Х месяцев)", GroupName = "Планирование")]
        public double? Periodichnost_TR_meh { get; set; }

        [Display(Name = "Периодичность КР мех (раз в Х месяцев)", GroupName = "Планирование")]
        public double? Periodichnost_KR_meh { get; set; }

        [Display(Name = "Периодичность ТО эл", GroupName = "Планирование")]
        public double? Periodichnost_TO_el { get; set; }

        [Display(Name = "Периодичность ТР эл", GroupName = "Планирование")]
        public double? Periodichnost_TR_el { get; set; }

        [Display(Name = "Периодичность КР эл", GroupName = "Планирование")]
        public double? Periodichnost_KR_el { get; set; }

        [Display(Name = "Периодичность ТО кип", GroupName = "Планирование")]
        public double? Periodichnost_TO_kip { get; set; }

        [Display(Name = "Периодичность ТР кип", GroupName = "Планирование")]
        public double? Periodichnost_TR_kip { get; set; }

        [Display(Name = "Периодичность ТО АСУ", GroupName = "Планирование")]
        public double? Periodichnost_TO_ASU { get; set; }

        [Display(Name = "Исполнитель ТО мех", GroupName = "Планирование")]
        public string? Ispolnitel_TO_meh { get; set; }

        [Display(Name = "Исполнитель ТР мех", GroupName = "Планирование")]
        public string? Ispolnitel_TR_meh { get; set; }

        [Display(Name = "Исполнитель КР мех", GroupName = "Планирование")]
        public string? Ispolnitel_KR_meh { get; set; }

        [Display(Name = "Исполнитель ТО эл", GroupName = "Планирование")]
        public string? Ispolnitel_TO_el { get; set; }

        [Display(Name = "Исполнитель ТР эл", GroupName = "Планирование")]
        public string? Ispolnitel_TR_el { get; set; }

        [Display(Name = "Исполнитель КР эл", GroupName = "Планирование")]
        public string? Ispolnitel_KR_el { get; set; }

        [Display(Name = "Исполнитель ТО кип", GroupName = "Планирование")]
        public string? Ispolnitel_TO_kip { get; set; }

        [Display(Name = "Исполнитель ТР кип", GroupName = "Планирование")]
        public string? Ispolnitel_TR_kip { get; set; }

        [Display(Name = "Исполнитель ТО АСУ", GroupName = "Планирование")]
        public string? Ispolnitel_TO_ASU { get; set; }

        [Display(Name = "Ремонтосложность механическая часть", GroupName = "Планирование")]
        public double? Remontoslozhnost_meh { get; set; }

        [Display(Name = "Ремонтосложность электрическая часть", GroupName = "Планирование")]
        public double? Remontoslozhnost_el { get; set; }

        [Display(Name = "Ремонтосложность КИПиА", GroupName = "Планирование")]
        public double? Remontoslozhnost_kip { get; set; }

        [Display(Name = "Ремонтосложность АСУТП", GroupName = "Планирование")]
        public double? Remontoslozhnost_ASUTP { get; set; }

        [Display(Name = "Дата начала запуска цикла ремонтов", GroupName = "Планирование")]
        public DateTime? Data_nachala_cikla_remontov { get; set; }

        [Display(Name = "Сменность", GroupName = "Планирование")]
        public string? Smennost { get; set; }

        [Display(Name = "Коэффициент условий труда", GroupName = "Планирование")]
        public double? Koefficient_usloviy_truda { get; set; }

        [Display(Name = "Дополнительный ремонтный коэффициент ДРК", GroupName = "Планирование")]
        public double? Dop_remontniy_koefficient_DRK { get; set; }

        // === Поверка ===
        [Display(Name = "Дата последней поверки", GroupName = "Поверка")]
        public DateTime? Data_posledney_poverki { get; set; }

        [Display(Name = "Годен до", GroupName = "Поверка")]
        public DateTime? Goden_do { get; set; }

        // === Надзор ===
        [Display(Name = "Является техническим устройством на ОПО", GroupName = "Надзор")]
        public bool Yavlyaetsya_tehnicheskim_ustroystvom_OPO { get; set; }

        [Display(Name = "Является техническим устройством на ХОПО", GroupName = "Надзор")]
        public bool Yavlyaetsya_tehnicheskim_ustroystvom_HOPO { get; set; }

        [Display(Name = "Является объектом, важным для безопасности", GroupName = "Надзор")]
        public bool Yavlyaetsya_obektom_vazhnim_bezopasnosti { get; set; }

        [Display(Name = "Является ядерной установкой", GroupName = "Надзор")]
        public bool Yavlyaetsya_yadernoy_ustanovkoy { get; set; }

        [Display(Name = "Нормативный документ для класса безопасности", GroupName = "Надзор")]
        public string? Normativniy_dokument_klassa_bezopasnosti { get; set; }

        [Display(Name = "Класс безопасности", GroupName = "Надзор")]
        public int? Klass_bezopasnosti { get; set; }

        [Display(Name = "Классификационное обозначение", GroupName = "Надзор")]
        public string? Klassifikacionnoe_oboznachenie { get; set; }

        [Display(Name = "Является объектом, влияющим на охрану окружающей среды", GroupName = "Надзор")]
        public bool Yavlyaetsya_obektom_ohrany_okruzhayuschey_sredy { get; set; }

        [Display(Name = "Является объектом противопожарной защиты", GroupName = "Надзор")]
        public bool Yavlyaetsya_obektom_protivopozharnoy_zaschity { get; set; }

        [Display(Name = "Надзорный орган (внешний)", GroupName = "Надзор")]
        public string? Nadzorniy_organ_vneshniy { get; set; }

        [Display(Name = "Надзорный орган (внутренний)", GroupName = "Надзор")]
        public string? Nadzorniy_organ_vnutrenniy { get; set; }

        [Display(Name = "Регистрационный номер", GroupName = "Надзор")]
        public string? Registracionniy_nomer { get; set; }

        [Display(Name = "Срок службы с даты изготовления (лет)", GroupName = "Надзор")]
        public int? Srok_sluzhby_let { get; set; }

        [Display(Name = "Дата истечения срока службы", GroupName = "Надзор")]
        public DateTime? Data_istecheniya_sroka_sluzhby { get; set; }
    }
}
