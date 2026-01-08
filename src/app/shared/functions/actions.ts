import { SearchFilterComponent } from "@shared/components/search-filter/search-filter.component"

export function DateFilter(component:any){
    let datesFilterArray = [
        {
            labelDate: component.component.datesFilterArray ? component.component.datesFilterArray[0] : 'Fecha de filtro',
            dateIni: component.component.filters?.startDate || null,
            dateFin: component.component.filters?.endDate || null
        },
        {

        }
    ]

    let dialogDatesFilter = component._dialog.open(SearchFilterComponent,{
        width: '380px',
        data: datesFilterArray
    })

    dialogDatesFilter.componentInstance.datesFilter.subscribe((data) =>{
        component.component.filters.startDate = data.startDate
        component.component.filters.endDate = data.endDate
    

        let filter_active = false
        Object.entries(data).forEach(([key, value]) => {
            if(value != null && filter_active == false){
                filter_active = true
            }
        })

        component.component.filters_dates_active = filter_active
        dialogDatesFilter.close(true)
    })

    dialogDatesFilter.afterClosed().subscribe((data:any) => {
        if(data){
            component.formatGetInputs()
        }
    })
}