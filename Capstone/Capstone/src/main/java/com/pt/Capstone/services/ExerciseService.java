package com.pt.Capstone.services;

import com.pt.Capstone.entities.Exercise;
import com.pt.Capstone.repositories.ExerciseRepository;
import com.pt.Capstone.requests.ExerciseRequest;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.ExerciseResponse;
import jakarta.persistence.EntityExistsException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@RequiredArgsConstructor
@Validated
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseResponse exerciseResponseFromEntity(Exercise exercise) {
        ExerciseResponse exerciseResponse = new ExerciseResponse();
        BeanUtils.copyProperties(exercise, exerciseResponse);
        return exerciseResponse;
    }

    public List<ExerciseResponse> exerciseResponseListFromEntityList(List<Exercise> exercises) {
        return exercises.stream().map(this::exerciseResponseFromEntity).toList();
    }

    public List<ExerciseResponse> findAll() {
        return exerciseResponseListFromEntityList(exerciseRepository.findAll());
    }

    public ExerciseResponse findById(Long id) {
        return exerciseResponseFromEntity(exerciseRepository.findById(id).get());
    }

    public Exercise ExerciseFromResponse(@Valid ExerciseResponse exerciseResponse) {
        Exercise exercise = new Exercise();
        BeanUtils.copyProperties(exerciseResponse, exercise);
        return exercise;
    }

    public Exercise ExerciseFromRequest(@Valid ExerciseRequest exerciseRequest) {
        Exercise exercise = new Exercise();
        BeanUtils.copyProperties(exerciseRequest, exercise);
        return exercise;
    }

    public EntityPostResponse save(ExerciseRequest exerciseRequest) {
        if (exerciseRepository.existsByName(exerciseRequest.getName())) {
            throw new EntityExistsException("Exercise with name: " + exerciseRequest.getName() + " already exists.");
        }
        Exercise exercise = ExerciseFromRequest(exerciseRequest);
        exerciseRepository.save(exercise);
        return new EntityPostResponse(exercise.getId());
    }

    public ExerciseResponse update(Long id, ExerciseRequest exerciseRequest) {
        Exercise exercise = ExerciseFromRequest(exerciseRequest);
        exercise.setId(id);
        return exerciseResponseFromEntity(exerciseRepository.save(exercise));
    }

    public void delete(Long id) {
        exerciseRepository.deleteById(id);
    }
}
