import React, { useState, useEffect } from 'react'
// import "./styles.css";

const data = [
   {
      name: 'Banglore',
      result: 'pass',
   },
   {
      name: 'Mumbai',
      result: 'pass',
   },
   {
      name: 'Chennai',
      result: 'pass',
   },
]

export default function Selectcity() {
   const [allChecked, setAllChecked] = useState(false)
   const [isChecked, setIsChecked] = useState()
   const [loading, setLoading] = useState(true)
   const [formData, setFormData] = useState(data)

   const handleAllCheck = (e) => {
      setAllChecked(e.target.checked)
   }

   const handleSingleCheck = (e) => {
      setIsChecked({ ...isChecked, [e.target.name]: e.target.checked })
   }

   useEffect(() => {
      if (!loading) {
         setIsChecked((current) => {
            const nextIsChecked = {}
            Object.keys(current).forEach((key) => {
               nextIsChecked[key] = allChecked
            })
            return nextIsChecked
         })
      }
   }, [allChecked, loading])

   useEffect(() => {
      const initialIsChecked = data.reduce((acc, d) => {
         acc[d.name] = false
         return acc
      }, {})
      setIsChecked(initialIsChecked)
      setLoading(false)
   }, [loading])

   return (
      <div className='' style={{ width: '500px' }}>
         <form className=''>
            <h3>Select City</h3>
            <div className='' style={{ margin: 'auto' }}>
               <input
                  name='checkall'
                  className='form-check-input'
                  type='checkbox'
                  checked={allChecked}
                  onChange={handleAllCheck}
               />
               <label> Select All</label>
               <label />
            </div>
            {!loading
               ? formData.map((test, index) => (
                    <div key={index}>
                       <input
                          type='checkbox'
                          className='form-check-input'
                          name={test.name}
                          checked={isChecked[test.name]}
                          onChange={handleSingleCheck}
                       />
                       <label>{test.name}</label>
                    </div>
                 ))
               : null}
         </form>
      </div>
   )
}
