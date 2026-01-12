import { Category } from "src/app/response/Category/category.response";
import icCategory from "@iconify/icons-ic/twotone-category";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label"
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today"
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumn } from "src/app/core/Interfaces/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";

const searcOptions: SearchOptions[] = [
    {
        label: "Nombre",
        value: 1,
        placeholder: "Buscar por el nombre",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permiten letras en esta busqueda",
        icon: "icName"
    },
    {
        label: "Descripcion",
        value: 1,
        placeholder: "Buscar por descripcion",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Solo se permiten letras y numeros en esta busqueda",
        icon: "icDescription"
    }
]

const menuItems : ListTableMenu[] = [
    {
        type: "link",
        id: "all",
        icon: icViewHeadline,
        label: "Todos"
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: icLabel,
        label: "Activo",
        classes: {
            icon: "text-green"
        }
    },
    {
        type: "link",
        id: "Inactivo",
        value: 1,
        icon: icLabel,
        label: "Inactivo",
        classes: {
            icon: "text-green"
        }
    }
]

const tableColumns: TableColumn<Category>[] = [
    {
        label: "NOMBRE",
        cssLabel: ["font-bold", "text-sm"],
        property: "name",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "name",
        visible: true,
        download: true
    }, 
    {
        label: "DESCIPCIÓN",
        cssLabel: ["font-bold", "text-sm"],
        property: "description",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "description",
        visible: true,
        download: true
    },
    {
        label: "F. DE CREACIÓN",
        cssLabel: ["font-bold", "text-sm"],
        property: "auditCreateDate",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "datetime",
        sticky: false,
        sort: true,
        visible: true,
        download: true
    },
    {
        label: "ESTADO",
        cssLabel: ["font-bold", "text-sm"],
        property: "stateCategory",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "badge",
        sticky: false,
        sort: false,
        visible: true,
        download: true
    },
    {
        label:"",
        cssLabel:[],
        property: "icEdit",
        cssProperty :[],
        type: "icon",
        action:"edit",
        sticky: false,
        sort: false,
        visible: true,
        download: false
    },
    {
        label:"",
        cssLabel:[],
        property: "icDelete",
        cssProperty :[],
        type: "icon",
        action:"remove",
        sticky: false,
        sort: false,
        visible: true,
        download: false
    }
]

const filters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: null,
    endDate: null
}

const inputs = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: null,
    endDate: null
}

export const componentSettings = {
    icCategory: icCategory,
    icCalendarMonth: icCalendarMonth,
    menuOpen: false,
    tableColumns: tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs: inputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    menuItems: menuItems,
    searchOptions: searcOptions,
    filters_dates_active: false,
    filters: filters,
    datesFilterArray: ['Fecha de Creación'],
    columnsFilter: tableColumns.map((columns) => {return {label: columns.label, property: columns.property, type: columns.type}})
}