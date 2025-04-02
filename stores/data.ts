import { defineStore } from 'pinia';
interface DataState {
    id: string | null
    categories: any | null
    programs: any | null
    filteredData: any | null
}

export const useDataStore = defineStore('data', {
    state: (): DataState => ({
        id: null,
        categories: [],
        programs: [],
        filteredData: []
    }),

    actions: {
        updateFilteredData(data: any) {
          try {
              this.filteredData = data;
          } catch (e) {
              console.error(e)
          }
        },
        updatePrograms(newPrograms: any) {
            try {
                this.programs = newPrograms
            } catch (e) {
                console.error(e)
            }
        },
        updateCategories(newCategories: any) {
            try {
                this.categories = newCategories
            } catch (e) {
                console.error(e)
            }
        }
    }
})

