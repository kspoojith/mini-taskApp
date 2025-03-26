import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasksList: [],
    task: '',
    tagId: tagsList[0].displayText,
    activetag: '',
  }

  taskChange = event => {
    this.setState({task: event.target.value})
  }

  tagChange = event => {
    this.setState({tagId: event.target.value})
  }

  onsubmit = event => {
    event.preventDefault()
    const {task, tagId} = this.state
    if (task !== '' && tagId !== '') {
      this.setState(prev => ({
        tasksList: [...prev.tasksList, {id: uuidv4(), task, tagId}],
        task: '',
      }))
    }
  }

  changeActivetag = displayText => {
    const {activetag} = this.state
    this.setState({activetag: activetag === displayText ? '' : displayText})
  }

  render() {
    const {task, tagId, activetag} = this.state
    let {tasksList} = this.state
    if (activetag !== '') {
      const tag = tagsList.filter(each => each.displayText === activetag)[0]
        .displayText
      tasksList = tasksList.filter(each => each.tagId === tag)
    }
    return (
      <div className="main-page">
        <form onSubmit={this.onsubmit}>
          <h1>Create a task!</h1>
          <div className="form-item">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              placeholder="Enter the task here"
              onChange={this.taskChange}
              value={task}
            />
          </div>
          <div className="form-item">
            <label htmlFor="tags">Tags</label>
            <select onChange={this.tagChange} value={tagId}>
              {tagsList.map(each => (
                <option value={each.displayText}>{each.displayText}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
        <div className="tasks-section">
          <h1>Tags</h1>
          <ul className="tags-ul">
            {tagsList.map(each => (
              <li>
                <button
                  className={activetag === each.displayText ? 'but1' : 'but'}
                  onClick={() => this.changeActivetag(each.displayText)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          <ul>
            {tasksList.map(each => (
              <li key={each.id}>
                <div className="each-task">
                  <p>{each.task}</p>
                  <p className="task-tag">{each.tagId}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
