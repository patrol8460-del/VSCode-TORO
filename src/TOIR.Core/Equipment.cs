
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
    }
}
