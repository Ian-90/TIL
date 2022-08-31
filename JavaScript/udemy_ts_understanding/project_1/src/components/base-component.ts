namespace App {
  // Componente Base Class
  // 직접 인스턴스화가 이루어지지않고 상속을 위해 사용되기 때문에 추상클래스로 적용
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string,
    ) {
      // type casting
      // this.templateElement = <HTMLTEmplateElement>document.getElementById('project-input')!
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
      this.hostElement = document.getElementById(hostElementId)! as T

      // 템플릿을 복제
      const importedNode = document.importNode(this.templateElement.content, true)
      this.element = importedNode.firstElementChild as U
      if (newElementId) {
        this.element.id = newElementId 
      }

      this.attach(insertAtStart)
    }
    
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend', this.element
      )
    }

    abstract configure(): void
    abstract renderContent(): void
  }
}
