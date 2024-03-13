import Store, { Schema } from 'electron-store'

interface Entity {
  config: APP.AppConfig
}

const schema: Schema<Entity> = {
  config: {
    type: 'object',
    default: {}
  }
}

export const store = new Store<Entity>({ schema })
