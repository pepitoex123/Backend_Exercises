
class Contenedor {
    constructor(model){
        this.model = model;
    }

    async getAll() {
        let data = await this.model.find()
        return data
    }


    async save(data) {
        let dataToSave = new this.model({
            ...data
        })
        let dataSaved = await dataToSave.save()
        return dataSaved
    }

    async getById(id) {

        let data = await this.model.find({
            id
        })

        return data
    }

    async updateById(id,data){
        let dataToReturn = await this.model.findOneAndUpdate({id},data,{
            new: true
        })

        return dataToReturn
    }

    async deleteAll(){
        await this.model.deleteMany({}, () => {
            console.log("Deleted data successfully!")
        })
    }

    async deleteById(id){
        let dataToReturn = await this.model.findOneAndRemove({id});
        return dataToReturn;
    }

}

module.exports = Contenedor;