import m from "mithril"

const todos = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo") || "[]")
const state = {
  i: 1,
  add_todo: "",
  edit_todo: "",
  save_todo: function () {
    localStorage.setItem("todo", JSON.stringify(todos))
  },
  _edit_todo: function(todo){
  	 todo.name = state.edit_todo
     todo.edit = false
     state.edit_todo = ""
     state.save_todo()
  }
}

const editTodo = {
  view: function (vnode) {
    return m("form", {
      onsubmit: function (e) {
        e.preventDefault()
        const index = vnode.attrs.id
        todos.map(function (todo) {
          if (todo.id === index && state.edit_todo !== "") {
				state._edit_todo(todo)
          }
        })
      }
    }, m("input.form-control", {
      oninput: function (e) {
        this.value = e.target.value
        state.edit_todo = e.target.value
      },
      placeholder: "edit todo",
      autofocus: true
    }))
  }
}

const todoList = {
  view: function () {
    return m("table.w-100 mt-3", m("tbody",
      todos.map(function (todo) {
        return m("tr", {
          id: todo.id,
          style: {
            "font-size": "16pt"
          }
        },
        m("th", {
          scope: "row"
        },
        m("label",
          m("input", {
            type: "checkbox",
            oninput: function () {
              todo.complete = this.checked
              state.save_todo()
            },
            checked: todo.complete,
            disabled: todo.edit ? "disabled" : false
          }), m("span", ""))
        ),
        m("th.w-75 text-wrap", {
          scope: "row"
        },
        todo.edit
          ? m("form", m(editTodo, {
            value: todo.name,
            id: todo.id
          }))
          : m("p.fw-normal text-break", {
            class: todo.complete ? "text-decoration-line-through text-muted" : "",
            style: {
              width: "100%"
            }
          }, todo.name)
        ),
        m("th.btn-group", {
          scope: "row"
        },
        m("button.btn tooltipped waves-effect waves-light  indigo lighten-1 mx-2", {
          onclick: function () {
            if (todo.edit && state.edit_todo !== "") {
				state._edit_todo()
            }
            todo.edit = !todo.edit
          },
          style: {
            padding_left: "20px"
          },
          id: "edit",
          "data-position": "top",
          "data-tooltip": todo.edit ? "done" : "edit",
          class: todo.complete ? "disabled" : ""
        }, m("i.material-icons", todo.edit ? "done" : "edit")),
        m("button.btn waves-effect waves-light  red darken-3", {
          onclick: function () {
            todos.splice(todos.indexOf(todo), 1)
            state.save_todo()
          },
          style: {
            padding_left: "20px"
          },
          class: todo.edit ? "disabled" : ""
        }, m("i.material-icons", "delete"))

        )
        )
      })))
  }
}

const MainView = {
  view: function () {
    return m("",
      m("form", {
        onsubmit: function (e) {
          e.preventDefault()
          if (state.add_todo !== "") {
            todos.push({
              id: state.i++,
              name: state.add_todo,
              complete: false,
              edit: false
            })
            state.add_todo = ""
            m.redraw()
            state.save_todo()
          }
        }
      },
      m(".input-group",
        m("input.form-control px-2 mx-1", {
          oninput: function (e) {
            state.add_todo = e.target.value
          },
          value: state.add_todo,
          placeholder: "add todo"
        }),
        m("button.btn-floating btn-large waves-effect waves-light red", {
          type: "submit"
        }, m("i.material-icons", "add"))
      ),
      m(todoList)
      )

    )
  }
}

export {
  MainView
}
