/*
Suppose you are creating an internal networking site for your company. You have two data sets to work with. The first data set is the employees at your company, and the second is all the pairs of employees who are virtually friends so far. It does not matter which employee's ID is in which column, the friendships are bidirectional.

You want to know who’s friends with whom. You need to implement a function that, given the employees and friendships as parameters, returns this data in the form of an adjacency list representation. This should associate each employee ID to his/her friends on the site.

{
  1: [2, 3, 6],
  2: [1, 4],
  3: [1],
  4: [2],
  6: [1],
  9: []
}
*/

/*
You’re curious how employees are using your site. Specifically, you want to know how people between different departments are interacting.

Write a function that returns a data structure that tracks, for each department: how many employees are in that department, and how many of those employees have friends in other departments.

Note for example that Carla (ID: 6) is only friends with fellow Engineering employees. So while she DOES count towards the total number of employees in Engineering, she DOES NOT count towards the number of employees with friends outside the department.

{
  Engineering: {employees: 3, employees_with_outside_friends: 2},
  HR: {employees: 1, employees_with_outside_friends: 1},
  Business: {employees: 1, employees_with_outside_friends: 1},
  Directors: {employees: 1, employees_with_outside_friends: 0}
}

*/

var employees_input = [
  "1,Richard,Engineering",
  "2,Erlich,HR",
  "3,Monica,Business",
  "4,Dinesh,Engineering",
  "6,Carla,Engineering",
  "9,Laurie,Directors"
];

var friendships_input = [
  "1,2",
  "1,3",
  "1,6",
  "2,4"
];


function normalized (arr) {
  return arr.map(v => {
      return v.split(',')
  })
}

function groupByDepartment(arr) {
  return arr.reduce((res, v) => {
    const id = v[0]
    res[v[2]] = [...or(res[v[2]]), v[0]]
    return res
  }, {})
}


function or(arr) {
  return arr === undefined ? [] : arr
}



const grouped = groupByDepartment(normalized(employees_input))

function getPresent(arr, vals) {
  if(arr.includes(vals[0])) {
    return vals[0]
  }
  if(arr.includes(vals[1])) {
    return vals[1]
  }
}

const res = Object.keys(grouped).reduce((res, deptKey ) => {
  const dept = grouped[deptKey]
  const diffDeptFriends = normalized(friendships_input).filter(r => {
  if(!dept.includes(r[0]) && !dept.includes(r[1])) {
      return false
  }
    
  if((dept.includes(r[0]) && dept.includes(r[1]))) {
      return false
  }
  return true
  }).reduce((res, v) => {
    const i = getPresent(dept, v)
    if(res.includes(i)) {
      return res
    } else {
      return [...res, i]
    }
  }, [])

  res[deptKey] = {
    employees: dept.length,
    employees_with_outside_friends: diffDeptFriends.length,
  }
  return res
}, {})

console.log(res)


