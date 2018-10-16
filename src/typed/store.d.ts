declare namespace IStore {
  interface IRoot {
    contact: IContact
    portal: IPortal
  }

  interface IContact {
    items: Contact[]
  }

  interface IPortal {
    title: string
    description: string
    packageJson: any
  }
}
