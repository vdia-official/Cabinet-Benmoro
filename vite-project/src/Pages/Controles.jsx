import { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Clock, User } from 'lucide-react';
import API_URL from '../config/api';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale/fr';

function Controles() {
  const [controles, setControles] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [editingControle, setEditingControle] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    date_controle: new Date().toISOString().split('T')[0],
    heure_controle: '',
    motif: '',
    notes: ''
  });

  useEffect(() => {
    fetchPatients();
    fetchControles();
  }, [selectedDate]);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${API_URL}/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    }
  };

  const fetchControles = async () => {
    try {
      const response = await fetch(`${API_URL}/controles?date=${selectedDate}`);
      const data = await response.json();
      setControles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des contrôles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingControle
        ? `${API_URL}/controles/${editingControle.id}`
        : `${API_URL}/controles`;
      
      const method = editingControle ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        setEditingControle(null);
        setFormData({
          patient_id: '',
          date_controle: selectedDate,
          heure_controle: '',
          motif: '',
          notes: ''
        });
        fetchControles();
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du contrôle');
    }
  };

  const handleEdit = (controle) => {
    setEditingControle(controle);
    setFormData({
      patient_id: controle.patient_id,
      date_controle: controle.date_controle,
      heure_controle: controle.heure_controle,
      motif: controle.motif || '',
      notes: controle.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contrôle ?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/controles/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchControles();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du contrôle');
    }
  };

  // Grouper les contrôles par heure
  const groupedControles = controles.reduce((acc, controle) => {
    const heure = controle.heure_controle;
    if (!acc[heure]) {
      acc[heure] = [];
    }
    acc[heure].push(controle);
    return acc;
  }, {});

  const heures = Object.keys(groupedControles).sort();

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Contrôles</h1>
        <button
          onClick={() => {
            setEditingControle(null);
            setFormData({
              patient_id: '',
              date_controle: selectedDate,
              heure_controle: '',
              motif: '',
              notes: ''
            });
            setShowModal(true);
          }}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Nouveau Contrôle
        </button>
      </div>

      {/* Sélecteur de date */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-6 h-6 text-primary-600" />
          <label className="text-gray-700 font-medium">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setFormData({ ...formData, date_controle: e.target.value });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
          <span className="text-gray-600">
            {format(parseISO(selectedDate), 'EEEE dd MMMM yyyy', { locale: fr })}
          </span>
        </div>
      </div>

      {/* Liste des contrôles du jour */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary-600" />
          Contrôles du jour ({controles.length})
        </h2>

        {controles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Aucun contrôle prévu pour cette date</p>
          </div>
        ) : (
          <div className="space-y-6">
            {heures.map((heure) => (
              <div key={heure} className="border-l-4 border-primary-600 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  {heure}
                </h3>
                <div className="space-y-3 ml-7">
                  {groupedControles[heure].map((controle) => (
                    <div
                      key={controle.id}
                      className="bg-primary-50 border border-primary-200 rounded-lg p-4 hover:bg-primary-100 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-5 h-5 text-primary-600" />
                            <h4 className="font-semibold text-gray-800 text-lg">
                              {controle.patients?.nom} {controle.patients?.prenom}
                            </h4>
                          </div>
                          {controle.motif && (
                            <p className="text-gray-700 mb-1">
                              <span className="font-medium">Motif:</span> {controle.motif}
                            </p>
                          )}
                          {controle.patients?.telephone && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Tél:</span> {controle.patients.telephone}
                            </p>
                          )}
                          {controle.notes && (
                            <p className="text-sm text-gray-600 mt-2 italic">{controle.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(controle)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(controle.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Ajout/Modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingControle ? 'Modifier le Contrôle' : 'Nouveau Contrôle'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Patient *
                </label>
                <select
                  required
                  value={formData.patient_id}
                  onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="">Sélectionner un patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.nom} {patient.prenom} - {patient.cin}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date_controle}
                    onChange={(e) => setFormData({ ...formData, date_controle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Heure *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.heure_controle}
                    onChange={(e) => setFormData({ ...formData, heure_controle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Motif
                </label>
                <input
                  type="text"
                  value={formData.motif}
                  onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                  placeholder="Ex: Contrôle post-opératoire, Suivi traitement..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {editingControle ? 'Modifier' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingControle(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Controles;

