import React from 'react'
import { useAuth } from '../../hooks/auth'
import Spinner from "../../components/Spinner";

const LearningResources = () => {
    const { authStatus, loading } = useAuth();
    if (loading) return <Spinner/>;
  return (

    <div>Learning Resources</div>
  )
}

export default LearningResources