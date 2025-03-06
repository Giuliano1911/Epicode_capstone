package com.pt.Capstone.services;

import com.pt.Capstone.entities.DetailedExercise;
import com.pt.Capstone.entities.TrainingDay;
import com.pt.Capstone.repositories.DetailedExerciseRepository;
import com.pt.Capstone.repositories.ExerciseRepository;
import com.pt.Capstone.repositories.TrainingDayRepository;
import com.pt.Capstone.requests.detailedExercise.*;
import com.pt.Capstone.responses.DetailedExerciseResponse;
import com.pt.Capstone.responses.EntityPostResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@RequiredArgsConstructor
@Validated
public class DetailedExerciseService {
    private final DetailedExerciseRepository detailedExerciseRepository;
    private final TrainingDayRepository trainingDayRepository;
    private final ExerciseRepository exerciseRepository;

    public DetailedExerciseResponse DetailedExerciseResponseFromDetailedExercise(DetailedExercise detailedExercise) {
        DetailedExerciseResponse detailedExerciseResponse = new DetailedExerciseResponse();
        BeanUtils.copyProperties(detailedExercise, detailedExerciseResponse);
        if (detailedExercise.getExercise() != null)
            detailedExercise.setExercise(exerciseRepository.findById(detailedExercise.getExercise().getId()).get());
        return detailedExerciseResponse;
    }

    public DetailedExerciseResponse findById(Long id) {
        return DetailedExerciseResponseFromDetailedExercise(detailedExerciseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedExercise with id: " + id + " not found")));
    }

    public EntityPostResponse save(Long id) {
        TrainingDay trainingDay = trainingDayRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("TrainingDay with id: " + id + " not found"));
        DetailedExercise detailedExercise = detailedExerciseRepository.save(new DetailedExercise());
        trainingDay.getDetailedExercises().add(detailedExercise);
        trainingDayRepository.save(trainingDay);
        return new EntityPostResponse(detailedExercise.getId());
    }

    public void updateExercise(Long id, @Valid ExerciseIdRequest exerciseIdRequest) {
        Long exerciseId = exerciseIdRequest.getExerciseId();
        DetailedExercise detailedExercise = detailedExerciseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedExercise with id: " + id + " not found"));
        detailedExercise.setExercise(exerciseRepository.findById(exerciseId).orElseThrow(() -> new EntityNotFoundException("Exercise with id: " + exerciseId + " not found")));
        detailedExerciseRepository.save(detailedExercise);
    }

    public void updateSets(Long id, @Valid SetsRequest setsRequest) {
        DetailedExercise detailedExercise = detailedExerciseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedExercise with id: " + id + " not found"));
        detailedExercise.setSets(setsRequest.getSets());
        detailedExerciseRepository.save(detailedExercise);
    }

    public void updateReps(Long id, @Valid RepsRequest repsRequest) {
        DetailedExercise detailedExercise = detailedExerciseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedExercise with id: " + id + " not found"));
        detailedExercise.setReps(repsRequest.getReps());
        detailedExerciseRepository.save(detailedExercise);
    }

    public void updateRest(Long id, @Valid RestRequest restRequest) {
        DetailedExercise detailedExercise = detailedExerciseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedExercise with id: " + id + " not found"));
        detailedExercise.setRest(restRequest.getRest());
        detailedExerciseRepository.save(detailedExercise);
    }

    public void delete(Long id) {
        detailedExerciseRepository.deleteById(id);
    }
}
