package com.example.API_Champedia.service;

import com.example.API_Champedia.model.VALO_Agents_Model;
import com.example.API_Champedia.repository.VALO_Agents_Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VALO_Agents_Service {

    @Autowired
    private VALO_Agents_Repository agentRepository;

    // GET ALL
    public List<VALO_Agents_Model> getAllAgents() {
        return agentRepository.findAll();
    }

    // GET BY ID
    public VALO_Agents_Model getAgentById(String id) {
        Optional<VALO_Agents_Model> agent = agentRepository.findById(id);
        return agent.orElse(null);
    }

    // CREATE
    public VALO_Agents_Model addAgent(VALO_Agents_Model agent) {
        Optional<VALO_Agents_Model> existingagent = agentRepository.findByAgentNameIgnoreCase(agent.getAgentName());

        if (existingagent.isPresent()) {
            throw new DuplicateAgentNameException("agent with name " + agent.getAgentName() + " already exists.");
        }
        return agentRepository.save(agent);
    }

    public class DuplicateAgentNameException extends RuntimeException {
        public DuplicateAgentNameException(String message) {
            super(message);
        }
    }

    // UPDATE
    public VALO_Agents_Model updateAgent(String id, VALO_Agents_Model agentData) {
        Optional<VALO_Agents_Model> existingAgent = agentRepository.findById(id);

        if (existingAgent.isPresent()) {
            VALO_Agents_Model agent = existingAgent.get();

            agent.setAgentName(agentData.getAgentName());
            agent.setAgentImages(agentData.getAgentImages());
            agent.setAgentRole(agentData.getAgentRole());
            agent.setAgentDescription(agentData.getAgentDescription());

            return agentRepository.save(agent);
        }

        return null;
    }

    // DELETE
    public boolean deleteAgent(String id) {
        if (agentRepository.existsById(id)) {
            agentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // *** ADDITION *** //
    // Get by Role
    public List<VALO_Agents_Model> getAgentsByRole(String role) {
        return agentRepository.findByAgentRole(role);
    }
}


