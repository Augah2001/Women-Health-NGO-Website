import { useState } from 'react'

const useFormModal = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number>();
    
  return {showFormModal, setShowFormModal, selectedItemId, setSelectedItemId}
}

export default useFormModal
