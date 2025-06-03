import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {columns, TeamButtons} from '../../utils/TeamHelper.jsx'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const TeamList = () => {
  const [teams, setTeams] = useState([])
  const [teamLoading, setTeamLoading] = useState(false)
  const [filteredTeams, setFilteredTeams] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      setTeamLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/team', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          let sno = 1
          const data = response.data.teams.map((team) => ({
            _id: team._id,
            sno: sno++,
            team_name: team.team_name,
            leader_name: team.leaderId?.userId?.name,
            no_of_memebers: team.employeeIds?.length
              ? `${team.employeeIds.length} member(s)`
              : 'No Members',
            action: <TeamButtons _id={team._id} onTeamDelete={onTeamDelete} />,
          }))

          setTeams(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setTeamLoading(false)
      }
    }

    fetchTeams()
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTeams(teams)
    } else {
      setFilteredTeams(
        teams.filter((team) =>
          team.team_name.toLowerCase().includes(searchQuery)
        )
      )
    }
  }, [teams, searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const onTeamDelete = async (id) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team._id !== id))
  }

  return (
    <>
      {teamLoading ? (
        <div className='text-center text-lg font-semibold'>Loading...</div>
      ) : (
        <div className='p-6 bg-gray-50 min-h-screen'>
          <div className='p-5'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>Manage Teams</h3>
            </div>

            <div className='flex justify-between items-center my-4'>
              <input
                type='text'
                placeholder='Search by Team Name'
                className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={searchQuery}
                onChange={handleSearch}
              />
              <Link
                to='/admin-dashboard/add-team'
                className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
              >
                Add New Team
              </Link>
            </div>

            <div className='mt-5'>
              <DataTable
                columns={columns}
                data={filteredTeams}
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TeamList
